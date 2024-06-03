package data

import (
	"fmt"

	"backend/internal/conf"

	"github.com/casdoor/casdoor-go-sdk/casdoorsdk"

	"github.com/go-kratos/kratos/v2/log"
	"github.com/google/wire"
)

// ProviderSet is data providers.
var ProviderSet = wire.NewSet(NewData, NewCasdoor, NewCasdoorRepo)

// Data .
type Data struct {
	cs *casdoorsdk.Client
}

// NewData .
func NewData(c *conf.Data, cs *casdoorsdk.Client, logger log.Logger) (*Data, func(), error) {
	cleanup := func() {
		log.NewHelper(logger).Info("closing the data resources")
	}
	return &Data{
		cs: cs,
	}, cleanup, nil
}

func NewCasdoor(cc *conf.Casdoor) *casdoorsdk.Client {
	fmt.Printf("Server:%v\n", cc.Casdoor.Server)
	fmt.Printf("certificate:%v\n", cc.Casdoor.Certificate)
	client := casdoorsdk.NewClient(
		cc.Casdoor.Server.Endpoint,
		cc.Casdoor.Server.ClientId,
		cc.Casdoor.Server.ClientSecret,
		cc.Casdoor.Certificate,
		cc.Casdoor.Server.Organization,
		cc.Casdoor.Server.Application,
	)

	return client
}
