package com.dk.test;

import net.sf.json.JSONObject;

import com.dk.result.Result;
import com.dk.service.UserService;
import com.dk.serviceImpl.UserServiceImpl;

public class Test {
	public static void main(String[] args) {
		UserService userService = new UserServiceImpl();
		Result result = userService.getUserInfos();
		System.out.println(result);
		JSONObject json = JSONObject.fromObject(result);
		System.out.println(json.get("data"));
	}

}
