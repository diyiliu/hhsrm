package com.diyiliu.hh.web.bean;

import com.diyiliu.hh.web.bean.base.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * Description: SysResource
 * Author: DIYILIU
 * Update: 2017-03-20 14:02
 */

@Table(name = "SYS_RESOURCE", schema = "SYSRES_ID")
public class SysResource extends BaseEntity{

    @Column(name = "SYSRES_ID")
    private Long resId;

    @Column(name = "PARENT_SYSRES_ID")
    private Long parentResId;

    @Column(name = "PARENT_SYSRES_IDS")
    private String parentResIds;

    @Column(name = "RESOURCE_NAME")
    private String resName;

    @Column(name = "RESOURCE_CODE")
    private String resCode;

    @Column(name = "TYPE")
    private String type;

    @Column(name = "URL")
    private String url;

    @Column(name = "ICON")
    private String icon;

    @Column(name = "SORT")
    private Integer sort;

    public Long getResId() {
        return resId;
    }

    public void setResId(Long resId) {
        this.resId = resId;
    }

    public Long getParentResId() {
        return parentResId;
    }

    public void setParentResId(Long parentResId) {
        this.parentResId = parentResId;
    }

    public String getParentResIds() {
        return parentResIds;
    }

    public void setParentResIds(String parentResIds) {
        this.parentResIds = parentResIds;
    }

    public String getResName() {
        return resName;
    }

    public void setResName(String resName) {
        this.resName = resName;
    }

    public String getResCode() {
        return resCode;
    }

    public void setResCode(String resCode) {
        this.resCode = resCode;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }
}
