package com.dk.controller;

import io.netty.handler.codec.http.HttpResponse;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dk.object.User;
import com.dk.result.Result;
import com.dk.service.UserService;

@Controller
@RequestMapping("user")
public class UserController {
	
	@Resource
	private UserService userService;
	
	@RequestMapping("getinfos.ll")
	@ResponseBody
	public Result getUserInfos(){
		Result result = new Result();
		result = userService.getUserInfos();
		return result;
	}
	
	@RequestMapping("updateinfo.ll")
	@ResponseBody
	public Result updateUserInfo(@RequestBody User user){
		Result result = new Result();
		result = userService.updateUserInfo(user);
		return result;
	}
	
	@RequestMapping("addinfo.ll")
	@ResponseBody
	public Result addUserInfo(@RequestBody User user){
		String role = user.getRole();
		if(role==null||role.isEmpty()){
			user.setRole("op");
		}
		Result result = new Result();
		result = userService.addUserInfo(user);
		return result;
	}
	
	@RequestMapping("deleteinfo.ll")
	@ResponseBody
	public Result deleteUserInfo(@RequestBody User user){
		Result result = new Result();
		result = userService.deleteUserInfo(user);
		return result;
	}
	
	@RequestMapping("logininfo.ll")
	@ResponseBody
	public Result loginUserInfo(@RequestBody User user){
		Result result = new Result();
		result = userService.loginUserInfo(user);
		return result;
	}
	
	@RequestMapping("getinfo.ll")
	@ResponseBody
	public Result getUserInfo(@RequestBody User info){
		Result result = new Result();
		result = userService.getUserInfo(info);
		return result;
	}

}
