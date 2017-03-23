package com.dk.serviceImpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.dk.object.IbeaconInfo;
import com.dk.result.Result;
import com.dk.service.IbeaconService;
import com.dk.util.DBUtil;

@Service
public class IbeaconServiceImpl implements IbeaconService{

	public Result getInfos() {
		// TODO Auto-generated method stub
		Result result = new Result();
		List<IbeaconInfo> infos = new ArrayList<IbeaconInfo>();
		Connection conn = null;
		Statement st = null;
		
		try {
			String sql = "select * from ibeacon order by minor";
			conn = DBUtil.getConnection();
			st = conn.createStatement();
			
			ResultSet rs = st.executeQuery(sql);
			while(rs.next()){
				IbeaconInfo info = new IbeaconInfo();
				info.setMinor(rs.getInt("minor"));
				info.setUuid(rs.getString("uuid"));
				info.setLog(rs.getDouble("longitude"));
				info.setLat(rs.getDouble("latitude"));
				
				infos.add(info);
			}
			result.setData(infos);
			result.setStates(true);
			result.setMessage("操作成功");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			result.setStates(false);
			result.setMessage("操作失败");
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

	public Result updateInfo(IbeaconInfo info) {
		// TODO Auto-generated method stub
		Result result = new Result();
		Connection conn = null;
		PreparedStatement ps = null;
		try {
			String sql = "update ibeacon set uuid=?,longitude=?,latitude=? where minor=?";
			conn = DBUtil.getConnection();
			ps = conn.prepareStatement(sql);
			ps.setString(1, info.getUuid());
			ps.setDouble(2, info.getLog());
			ps.setDouble(3, info.getLat());
			ps.setInt(4, info.getMinor());
			
			ps.execute();
			result.setData(info);
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

	@Override
	public Result getInfo(IbeaconInfo info) {
		// TODO Auto-generated method stub
		Result result = new Result();
		List<IbeaconInfo> infos = new ArrayList<IbeaconInfo>();
		Connection conn = null;
		Statement st = null;
		StringBuffer sql = new StringBuffer("select * from ibeacon where 1=1");
		if(info.getMinor()!=null){
			sql.append(" and minor="+info.getMinor());
		}
		if(info.getUuid()!=null&&!info.getUuid().isEmpty()){
			sql.append(" and uuid='"+info.getUuid()+"'");
		}
		sql.append(" order by minor");
		try {
			conn = DBUtil.getConnection();
			st = conn.createStatement();
			ResultSet rs = st.executeQuery(sql.toString());
			while(rs.next()){
				IbeaconInfo ibeaconInfo = new IbeaconInfo();
				ibeaconInfo.setMinor(rs.getInt("minor"));
				ibeaconInfo.setUuid(rs.getString("uuid"));
				ibeaconInfo.setLat(rs.getDouble("latitude"));
				ibeaconInfo.setLog(rs.getDouble("longitude"));
				
				infos.add(ibeaconInfo);
			}
			result.setData(infos);
			result.setMessage("操作成功");
			result.setStates(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			result.setStates(false);
			result.setMessage("操作失败");
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

	@SuppressWarnings("unchecked")
	@Override
	public Result addInfo(IbeaconInfo info) {
		// TODO Auto-generated method stub
		Result result = new Result();
		result = getInfo(info);
		if(((ArrayList<IbeaconInfo>)result.getData()).size()>0){
			result.setStates(false);
			return result;
		}
		result = new Result();
		Connection conn = null;
		PreparedStatement ps = null;
		
		try {
			String sql = "insert into ibeacon(minor,uuid,longitude,latitude) values(?,?,?,?)";
			conn = DBUtil.getConnection();
			ps = conn.prepareStatement(sql);
			ps.setInt(1, info.getMinor());
			ps.setString(2, info.getUuid());
			ps.setDouble(3, info.getLog());
			ps.setDouble(4, info.getLat());
			
			ps.execute();
			result.setStates(true);
			result.setData(info);
			result.setMessage("保存成功");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			result.setStates(false);
			result.setMessage("操作失败");
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

	@Override
	public Result deleteInfo(IbeaconInfo info) {
		// TODO Auto-generated method stub
		Result result = new Result();
		Connection conn = null;
		PreparedStatement ps = null;
		
		try {
			String sql = "delete from ibeacon where minor=?";
			conn = DBUtil.getConnection();
			ps = conn.prepareStatement(sql);
			ps.setInt(1, info.getMinor());
			
			ps.execute();
			result.setStates(true);
			result.setData(info);
			result.setMessage("删除成功");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			result.setMessage("删除失败");
			result.setStates(true);
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
