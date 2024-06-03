package biz

import (
	"context"

	"github.com/casdoor/casdoor-go-sdk/casdoorsdk"
	"github.com/go-kratos/kratos/v2/log"
)

type SigninRequest struct {
	Code  string `json:"code,omitempty"`
	State string `json:"state,omitempty"`
}
type SigninReply struct {
	State string `json:"state,omitempty"`
	Data  string `json:"data,omitempty"`
}
type UserinfoRequest struct {
	Authorization string
}

type UserinfoReply struct {
	State string          `json:"state,omitempty"`
	Data  casdoorsdk.User `json:"data"`
}

type CasdoorRepo interface {
	Signin(ctx context.Context, req *SigninRequest) (*SigninReply, error)
	Userinfo(ctx context.Context, req *UserinfoRequest) (*UserinfoReply, error)
}

type CasdoorUsecase struct {
	repo CasdoorRepo
	log  *log.Helper
}

func NewCasdoorUsecase(repo CasdoorRepo, logger log.Logger) *CasdoorUsecase {
	return &CasdoorUsecase{
		repo: repo,
		log:  log.NewHelper(logger),
	}
}

func (cc *CasdoorUsecase) Signin(ctx context.Context, req *SigninRequest) (*SigninReply, error) {
	cc.log.WithContext(ctx).Infof("Signin request: %+v", req)
	return cc.repo.Signin(ctx, req)
}

func (cc *CasdoorUsecase) Userinfo(ctx context.Context, req *UserinfoRequest) (*UserinfoReply, error) {
	cc.log.WithContext(ctx).Infof("Userinfo request: %+v", req)
	return cc.repo.Userinfo(ctx, req)
}
