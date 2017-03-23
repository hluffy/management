package com.dk.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dk.result.Result;
import com.dk.service.PositonService;

@Controller
@RequestMapping("position")
public class PositionController {
	@Resource
	private PositonService positionService;
	
	@RequestMapping("getinfos.ll")
	@ResponseBody
	public Result getInfos(){
		Result result = new Result();
		result = positionService.getInfos();
		return result;
	}
	
	@RequestMapping("getinfo.ll")
	@ResponseBody
	public Result getInfoAsFrameNum(String frameNum){
		Result result = new Result();
		result = positionService.getInfoAsFrameNum(frameNum);
		return result;
	}

}
