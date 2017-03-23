package com.dk.object;

public class IbeaconInfo {
	private Integer minor;
	private String uuid;
	private Double log;//经度
	private Double lat;//纬度
	public Integer getMinor() {
		return minor;
	}
	public void setMinor(Integer minor) {
		this.minor = minor;
	}
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
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
	

}
