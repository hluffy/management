package com.dk.filter;

import java.io.IOException;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.dk.object.RoleList;
import com.dk.object.User;
import com.dk.service.UserService;
import com.dk.serviceImpl.UserServiceImpl;

public class RoleFilter implements Filter{
//	@Resource
//	private UserService userServer;

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain filterChain) throws IOException, ServletException {
		addRoleStr();
		List<String> roleList = RoleList.getOpList();
//		UserService userServer = new UserServiceImpl();
		HttpServletRequest request = (HttpServletRequest)arg0;
		
		ServletContext sc = request.getServletContext();
		//获取Spring容器
		ApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(sc);
		UserService userServer = ctx.getBean(UserServiceImpl.class);

		
		// TODO Auto-generated method stub
		
		HttpServletResponse response  = (HttpServletResponse)arg1;
		String uri = request.getRequestURI().substring(request.getRequestURI().indexOf("/",1)+1);
		if("user/logininfo.ll".equals(uri)||"user/addinfo.ll".equals(uri)){
			removeCookie(request,"username");
			filterChain.doFilter(arg0, arg1);
			return;
		}
		String userName = getCookie(request,"username");
		if(userName!=null&&!userName.isEmpty()){
			User userInfo = userServer.getUserAsUserName(userName);
			if(userInfo==null){

				String path = request.getContextPath();
				response.sendRedirect(path);
				return;
			}
			String role = userInfo.getRole();
			if("admin".equals(role)){
				filterChain.doFilter(arg0, arg1);
			}else if("op".equals(role)){
				if(roleList.lastIndexOf(uri)!=-1){
					filterChain.doFilter(arg0, arg1);
				}else{
					return;
				}
			}else{
				return;
			}
			
		}
		
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
		
	}
	
	private String getCookie(HttpServletRequest request, String cookieName){
		Cookie[] cookies = request.getCookies();
		if(cookies==null){
			return null;
		}
		for(Cookie cookie : cookies){
			if(cookieName.equals((cookie).getName())){
				return cookie.getValue();
			}
		}
		return null;
	}
	
	private void removeCookie(HttpServletRequest request, String cookieName){
		Cookie[] cookies = request.getCookies();
		if(cookies==null){
			return;
		}
		for(Cookie cookie : cookies){
			if(cookieName.equals((cookie).getName())){
				cookie.setValue("");
			}
		}
	}
	
	private void addRoleStr(){
		RoleList.addList("user/getinfos.ll");
		RoleList.addList("user/deleteinfo.ll");
	}


}
