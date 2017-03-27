package com.diyiliu.support.util;

import com.diyiliu.support.other.Pagination;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Description: JsonUtil
 * Author: DIYILIU
 * Update: 2017-03-22 15:30
 */
public class JsonUtil {

    public static String toJson(Object obj){
        ObjectMapper objectMapper = new ObjectMapper();

        String json = "";
        try {
            json = objectMapper.writeValueAsString(obj);
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
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            response.setContentType("application/json;charset=UTF-8");
            objectMapper.writeValue(response.getWriter(), obj);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 转分页JSON
     * @param page
     * @param response
     */
    public static void renderJson(Pagination page, HttpServletResponse response){
        ObjectMapper objectMapper = new ObjectMapper();

        SimpleModule module = new SimpleModule();
        // 保留两位小数
        module.addSerializer(BigDecimal.class, new JsonSerializer<BigDecimal>() {
            @Override
            public void serialize(BigDecimal value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
                gen.writeString(value.setScale(1, BigDecimal.ROUND_HALF_UP).toString());
            }
        });
        // 日期格式
        module.addSerializer(Date.class, new JsonSerializer<Date>() {
            @Override
            public void serialize(Date value, JsonGenerator gen, SerializerProvider serializers) throws IOException {

                gen.writeString(String.format("%1$tY-%1$tm-%1$td %1$tH:%1$tM:%1$tS", value));
            }
        });
        objectMapper.registerModule(module);


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
            objectMapper.writeValue(response.getWriter(), result);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
