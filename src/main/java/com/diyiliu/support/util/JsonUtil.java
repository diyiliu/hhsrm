package com.diyiliu.support.util;

import com.diyiliu.support.other.Pagination;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Description: JsonUtil
 * Author: DIYILIU
 * Update: 2017-03-22 15:30
 */
public class JsonUtil {

    private final static ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    public static String toJson(Object obj){

        String json = "";
        try {
            json = OBJECT_MAPPER.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return json;
    }

    /**
     * 转JSON
     * @param obj
     * @param response
     */
    public static void renderJson(Object obj, HttpServletResponse response){
        try {
            response.setContentType("application/json;charset=UTF-8");
            OBJECT_MAPPER.writeValue(response.getWriter(), obj);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 转分页JSON
     * @param obj
     * @param page
     * @param response
     */
    public static void renderJson(Pagination page, HttpServletResponse response){

        // 将要转换的对象
        Map<String, Object> result = new HashMap<String, Object>();
        // 总记录条数
        if (page.getTotal() < 1)
        {
            result.put("iTotalRecords", 0);
            result.put("iTotalDisplayRecords", 0);
            result.put("orderTotalCount", 0);
            result.put("orderTotalAmount", 0);
        } else
        {
            result.put("iTotalRecords", page.getTotal());
            result.put("iTotalDisplayRecords", page.getTotal());
        }

        // 数据行
        result.put("aaData", page.getRows());
        try {
            response.setContentType("application/json;charset=UTF-8");
            OBJECT_MAPPER.writeValue(response.getWriter(), result);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
