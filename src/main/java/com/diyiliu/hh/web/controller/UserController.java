package com.diyiliu.hh.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Description: UserController
 * Author: DIYILIU
 * Update: 2017-03-24 09:20
 */

@Controller
@RequestMapping(value = "/sys/user", produces = "text/html;charset=UTF-8")
public class UserController {


    @RequestMapping("/list")
    public String list(){


        return "sys/user/userList";
    }

}
