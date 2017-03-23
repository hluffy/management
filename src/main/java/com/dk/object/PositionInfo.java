package com.dk.object;

import java.sql.Timestamp;

public class PositionInfo {
	private String equipmentNum;
	private String frameNum;
	private Integer elec;
	private Double log;
	private Double lat;
	private String positionMode;
	private Timestamp positionTime;
	
	private String positionTimeStr;
	public String getEquipmentNum() {
		return equipmentNum;
	}
	public void setEquipmentNum(String equipmentNum) {
		this.equipmentNum = equipmentNum;
	}
	public String getFrameNum() {
		return frameNum;
	}
	public void setFrameNum(String frameNum) {
		this.frameNum = frameNum;
	}
	public Integer getElec() {
		return elec;
	}
	public void setElec(Integer elec) {
		this.elec = elec;
	}
	public Double getLog() {
		return log;
	}
	public void setLog(Double log) {
		this.log = log;
	}
	public Double getLat() {
		return lat;
	}
	public void setLat(Double lat) {
		this.lat = lat;
	}
	public String getPositionMode() {
		return positionMode;
	}
	public void setPositionMode(String positionMode) {
		this.positionMode = positionMode;
	}
	public Timestamp getPositionTime() {
		return positionTime;
	}
	public void setPositionTime(Timestamp positionTime) {
		this.positionTime = positionTime;
	}
	public String getPositionTimeStr() {
		return positionTimeStr;
	}
	public void setPositionTimeStr(String positionTimeStr) {
		this.positionTimeStr = positionTimeStr;
	}
	

}
