package server

import (
	"fmt"

	casdoorV1 "backend/api/casdoor/v1"
	"backend/internal/conf"
	"backend/internal/service"

	"github.com/go-kratos/kratos/v2/middleware/recovery"
	"github.com/go-kratos/kratos/v2/transport/http"
	"github.com/gorilla/handlers"
)

func MultipartFormDataDecoder(r *http.Request, v interface{}) error {
	// 从Request Header的Content-Type中提取出对应的解码器
	_, ok := http.CodecForRequest(r, "Content-Type")
	// 如果找不到对应的解码器此时会报错
	if !ok {
		fmt.Printf("Content-Type: '%s' \n", r.Header.Get("Content-Type"))
		r.Header.Set("Content-Type", "application/json")
		// return errors.BadRequest("CODEC", r.Header.Get("Content-Type"))
	}
	fmt.Printf("method: %s \n", r.Method)
	// if r.Method == "POST" {
	// 	data, err := ioutil.ReadAll(r.Body)
	// 	if err != nil {
	// 		return errors.BadRequest("CODEC", err.Error())
	// 	}
	// 	if err = codec.Unmarshal(data, v); err != nil {
	// 		return errors.BadRequest("CODEC", err.Error())
	// 	}
	// }

	return nil
}

// NewHTTPServer new an HTTP server.
func NewHTTPServer(
	c *conf.Server,
	cc *conf.Casdoor,
	casdoor *service.CasdoorService,
) *http.Server {
	opts := []http.ServerOption{
		http.Middleware(
			recovery.Recovery(),
		),
		http.Filter(handlers.CORS( // 浏览器跨域
			handlers.AllowedOrigins([]string{"http://localhost:3000", "http://127.0.0.1:3000"}),
			handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS"}),
			handlers.AllowedHeaders([]string{"Authorization", "Content-Type"}),
			handlers.AllowCredentials(),
		)),
		http.RequestDecoder(MultipartFormDataDecoder),
	}
	if c.Http.Network != "" {
		opts = append(opts, http.Network(c.Http.Network))
	}
	if c.Http.Addr != "" {
		opts = append(opts, http.Address(c.Http.Addr))
	}
	if c.Http.Timeout != nil {
		opts = append(opts, http.Timeout(c.Http.Timeout.AsDuration()))
	}
	srv := http.NewServer(opts...)
	casdoorV1.RegisterCasdoorHTTPServer(srv, casdoor)
	return srv
}
