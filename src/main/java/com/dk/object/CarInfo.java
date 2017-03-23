package com.dk.object;

import java.sql.Timestamp;

public class CarInfo {
	private String frameNum;
	private String engineNum;
	private Timestamp productionTime;
	
	private String productionTimeStr;
	public String getFrameNum() {
		return frameNum;
	}
	public void setFrameNum(String frameNum) {
		this.frameNum = frameNum;
	}
	public String getEngineNum() {
		return engineNum;
	}
	public void setEngineNum(String engineNum) {
		this.engineNum = engineNum;
	}
	public Timestamp getProductionTime() {
		return productionTime;
	}
	public void setProductionTime(Timestamp productionTime) {
		this.productionTime = productionTime;
	}
	public String getProductionTimeStr() {
		return productionTimeStr;
	}
	public void setProductionTimeStr(String productionTimeStr) {
		this.productionTimeStr = productionTimeStr;
	}
	

}
