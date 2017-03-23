package com.dk.serviceImpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.dk.object.PositionInfo;
import com.dk.result.Result;
import com.dk.service.PositonService;
import com.dk.util.DBUtil;

@Service
public class PositionServiceImpl implements PositonService{

	public Result getInfos() {
		// TODO Auto-generated method stub
		Result result = new Result();
		List<PositionInfo> infos = new ArrayList<PositionInfo>();
		Connection conn = null;
		Statement st = null;
		
		try {
			String sql = "select * from positioning";
			conn = DBUtil.getConnection();
			st = conn.createStatement();
			ResultSet rs = st.executeQuery(sql);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			while(rs.next()){
				PositionInfo info = new PositionInfo();
				info.setEquipmentNum(rs.getString("equipment_num"));
				info.setFrameNum(rs.getString("frame_num"));
				info.setElec(rs.getInt("electricity"));
				info.setLog(rs.getDouble("longitude"));
				info.setLat(rs.getDouble("latitude"));
				info.setPositionMode(rs.getString("positioning_mode"));
//				info.setPositionTime(rs.getTimestamp("positioning_time"));
				
				Timestamp positionTime = rs.getTimestamp("positioning_time");
				info.setPositionTime(positionTime);
				if(positionTime!=null){
					info.setPositionTimeStr(sdf.format((Date)positionTime));
				}else{
					info.setPositionTimeStr("");
				}
				
				infos.add(info);
			}
			
			result.setData(infos);
			result.setMessage("操作成功");
			result.setStates(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			result.setMessage("操作失败");
			result.setStates(false);
			e.printStackTrace();
		} finally{
			if(conn!=null){
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if(st!=null){
				try {
					st.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return result;
	}

	@Override
	public Result getInfoAsFrameNum(String frameNum) {
		// TODO Auto-generated method stub
		Result result = new Result();
		Connection conn = null;
		PreparedStatement ps = null;
		PositionInfo info = new PositionInfo();
		
		try {
			String sql = "select * from positioning where frame_num=?";
			conn = DBUtil.getConnection();
			ps = conn.prepareStatement(sql);
			ps.setString(1, frameNum);
			
			ResultSet rs = ps.executeQuery();
			if(rs.next()){
				info.setEquipmentNum(rs.getString("equipment_num"));
				info.setFrameNum(frameNum);
				info.setElec(rs.getInt("electricity"));
				info.setLog(rs.getDouble("longitude"));
				info.setLat(rs.getDouble("latitude"));
				info.setPositionMode(rs.getString("positioning_mode"));
				info.setPositionTime(rs.getTimestamp("positioning_time"));
			}
			
			result.setData(info);
			result.setMessage("查询成功");
			result.setStates(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			result.setMessage("查询失败");
			result.setStates(false);
			e.printStackTrace();
		} finally{
			if(conn!=null){
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if(ps!=null){
				try {
					ps.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return result;
	}

}
