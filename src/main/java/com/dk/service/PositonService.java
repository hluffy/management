package com.dk.service;

import com.dk.object.PositionInfo;
import com.dk.result.Result;

public interface PositonService {
	Result getInfos();
	Result getInfoAsFrameNum(String frameNum);
	Result getInfo(PositionInfo info);

}
