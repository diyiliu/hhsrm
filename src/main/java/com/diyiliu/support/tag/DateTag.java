package com.diyiliu.support.tag;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Description: DateTag
 * Author: DIYILIU
 * Update: 2016-10-10 15:28
 */

public class DateTag extends SimpleTagSupport {

    private Date date;

    @Override
    public void doTag() throws JspException, IOException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        JspContext jspContext = getJspContext();
        jspContext.getOut().write(dateFormat.format(date));
    }

    public void setDate(Date date) {
        this.date = date;
    }
}