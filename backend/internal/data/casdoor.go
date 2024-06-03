package data

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"backend/internal/biz"

	"github.com/go-kratos/kratos/v2/log"
)

type CasdoorRepo struct {
	data *Data
	log  *log.Helper
}

func NewCasdoorRepo(data *Data, logger log.Logger) biz.CasdoorRepo {
	return &CasdoorRepo{
		data: data,
		log:  log.NewHelper(logger),
	}
}

func (c *CasdoorRepo) Signin(ctx context.Context, req *biz.SigninRequest) (*biz.SigninReply, error) {
	code := req.Code
	state := req.State
	token, err := c.data.cs.GetOAuthToken(code, state)
	if err != nil {
		fmt.Println("GetOAuthToken() error", err)
		return nil, errors.New("GetOAuthToken() error:" + err.Error())
	}

	return &biz.SigninReply{
		State: "ok",
		Data:  token.AccessToken,
	}, nil
}

func (c *CasdoorRepo) Userinfo(ctx context.Context, req *biz.UserinfoRequest) (*biz.UserinfoReply, error) {
	authHeader := req.Authorization
	if authHeader == "" {
		return nil, fmt.Errorf("authorization: (%v) header is empty", authHeader)
	}

	token := strings.Split(authHeader, "Bearer ")
	if len(token) < 2 {
		return nil, fmt.Errorf("token is not valid Bearer token : %s", authHeader)
	}

	fmt.Printf("token:%v", token)
	claims, err := c.data.cs.ParseJwtToken(token[1])
	fmt.Printf("claims%v", claims)
	if err != nil {
		return nil, fmt.Errorf("ParseJwtToken() error")
	}

	return &biz.UserinfoReply{
		State: "ok",
		Data:  claims.User,
	}, nil
}
