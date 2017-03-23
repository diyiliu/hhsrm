package com.diyiliu.support.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

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
}
