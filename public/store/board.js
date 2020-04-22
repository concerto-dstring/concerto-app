    {
      "columns": [
        {
          "columnKey": "1000",
          "name": "",
          "width": 36,
          "type": "ROWACTION",
          "columnComponentType": "",
          "fixed": true,
          "level": 0
        },
        {
          "columnKey": "1001",
          "name": "",
          "width": 36,
          "type": "ROWSELECT",
          "columnComponentType": "",
          "fixed": true,
          "level": 0
        },
        {
          "columnKey": "1",
          "name": "分解任务",
          "width": 350,
          "type": "EDITBOX",
          "columnComponentType": "TEXT",
          "collpse": false,
          "fixed": true,
          "level": 0
        },
        {
          "columnKey": "2",
          "name": "状态",
          "width": 200,
          "type": "EDITBOX",
          "columnComponentType": "STATUS",
          "collpse": false,
          "level": 0
        },
        {
          "columnKey": "3",
          "name": "责任人",
          "width": 200,
          "type": "EDITBOX",
          "columnComponentType": "PEOPLE",
          "collpse": false,
          "level": 0
        },
        {
          "columnKey": "4",
          "name": "完成日期",
          "width": 200,
          "type": "EDITBOX",
          "columnComponentType": "DATE",
          "collpse": false,
          "level": 0
        },
        {
          "columnKey": "1002",
          "name": "",
          "width": 36,
          "type": "ROWACTION",
          "columnComponentType": "",
          "fixed": true,
          "level": 1
        },
        {
          "columnKey": "1003",
          "name": "",
          "width": 36,
          "type": "ROWSELECT",
          "columnComponentType": "",
          "fixed": true,
          "level": 1
        },
        {
          "columnKey": "1",
          "name": "子题",
          "width": 350,
          "type": "EDITBOX",
          "columnComponentType": "TEXT",
          "collpse": false,
          "fixed": true,
          "level": 1
        },
        {
          "columnKey": "11",
          "name": "任务描述",
          "width": 200,
          "type": "EDITBOX",
          "columnComponentType": "TEXT",
          "collpse": false,
          "level": 1
        },
        {
          "columnKey": "12",
          "name": "日志",
          "width": 200,
          "type": "EDITBOX",
          "columnComponentType": "TEXT",
          "collpse": false,
          "level": 1
        }
      ],
      "groups": [
        {
          "groupKey": "1",
          "name": "Sprint1",
          "rows": [
            "1",
            "2",
            "3",
            "4"
          ],
          "color": "#4682B4",
          "isCollapsed": false
        },
        {
          "groupKey": "2",
          "name": "Sprint2",
          "rows": [
            "5",
            "6",
            "7",
            "8"
          ],
          "color": "#CD5C5C",
          "isCollapsed": false
        },
        {
          "groupKey": "3",
          "name": "Sprint3",
          "rows": [
            "9",
            "10",
            "13",
            "14"
          ],
          "color": "#79CDCD",
          "isCollapsed": false
        }
      ],
      "rowData": {
        "1": {
          "1": "react.js培训",
          "2": "已完成",
          "3": [{
                  "smallName":"Z",
                  "userName":"ZhangGuoLi",
                  "faceColor":"#66cdff"
                },{
                  "smallName":"Z",
                  "userName":"Zhang Tao",
                  "faceColor":"#f4617f"
                },{
                  "smallName":"J",
                  "userName":"Jiang Guangzhou",
                  "faceColor":"#f49642"
                }],
          "4": "2020-03-12  5:00PM",
          "5": "",
          "6": "补充说明 1"
        },
        "2": {
          "1": "Monday's performance test",
          "2": "进行中",
          "3": [{
            "smallName":"Z",
            "userName":"ZhangGuoLi",
            "faceColor":"#66cdff"
          }],
          "4": "2020-03-09  8:00PM",
          "5": "",
          "6": "",
          "updateInfo": [
            {
              "id": "u_10_1",
              "author": {
                "smallName": "JGZ",
                "userName": "Jiang Guangzhou",
                "faceColor": "#AFEEEE",
                "userUrl": "https://www.baidu.com?jiangguangzhou"
              },
              "createTime": "2020-04-01 10:09:24",
              "content": "测试一下",
              "seen": 6,
              "isLiked": true,
              "replyList": [
                {
                  "id": "u_10_1_1",
                  "replyMsg": "这个问题怎么解决呢？",
                  "replyUser": {
                    "smallName": "LW",
                    "userName": "Li Wei",
                    "faceColor": "#9370DB",
                    "userUrl": "https://www.baidu.com?liwei"
                  },
                  "isLiked": false,
                  "createTime": "2020-04-05 10:09:24"
                },
                {
                  "id": "u_10_1_2",
                  "replyMsg": "回复<a href='https://www.baidu.com?liwei' target='_blank'>@LiWei :</a>解决这个问题，就要先这样，再那样，就解决了",
                  "replyUser": {
                    "smallName": "ZT",
                    "userName": "Zhang Tao",
                    "faceColor": "#f4617f",
                    "userUrl": "https://www.baidu.com?zhangtao"
                  },
                  "isLiked": true,
                  "createTime": "2020-04-08 20:09:24"
                }
              ]
            },
            {
              "id": "u_10_2",
              "author": {
                "smallName": "L",
                "userName": "Leo",
                "faceColor": "#f49642",
                "userUrl": "https://www.baidu.com?leo"
              },
              "createTime": "2020-04-12 14:09:24",
              "content": "测试一下是否存在问腿",
              "seen": 5,
              "isLiked": false,
              "replyList": []
            }
          ]
        },
        "3": {
          "1": "github code review before checkin",
          "2": "To Do",
          "3": [{
            "smallName":"J",
            "userName":"Jiang Guangzhou",
            "faceColor":"#f49642"
          }],
          "4": "2020-03-16  6:00PM",
          "5": "",
          "6": ""
        },
        "4": {
          "1": "implement column type templates: input date",
          "2": "已完成",
          "3": [{
            "smallName":"J",
            "userName":"Jiang Guangzhou",
            "faceColor":"#f49642"
          }],
          "4": "2020-03-11  8:00PM",
          "5": "",
          "6": ""
        },
        "5": {
          "1": "implement column type templates: input number",
          "2": "阻塞",
          "3": [{
            "smallName":"J",
            "userName":"Jiang Guangzhou",
            "faceColor":"#f49642"
          }],
          "4": "2020-04-09  5:00PM",
          "5": "",
          "6": ""
        },
        "6": {
          "1": "column type / 列库开发： 文本列类型",
          "2": "已完成",
          "3": [{
            "smallName":"J",
            "userName":"Jiang Guangzhou",
            "faceColor":"#f49642"
          }],
          "4": "2020-04-11  5:00PM",
          "5": "",
          "6": ""
        },
        "7": {
          "1": "column menu:delete colum;sortorder",
          "2": "已完成",
          "3": [{
            "smallName":"Z",
            "userName":"ZhangGuoLi",
            "faceColor":"#66cdff"
          },{
            "smallName":"Z",
            "userName":"Zhang Tao",
            "faceColor":"#f4617f"
          },{
            "smallName":"J",
            "userName":"Jiang Guangzhou",
            "faceColor":"#f49642"
          }],
          "4": "2020-04-27  8:00PM",
          "5": "",
          "6": "",
          "updateInfo": [
            {
              "id": "u_10_1",
              "author": {
                "smallName": "JGZ",
                "userName": "Jiang Guangzhou",
                "faceColor": "#AFEEEE",
                "userUrl": "https://www.baidu.com?jiangguangzhou"
              },
              "createTime": "2020-04-01 10:09:24",
              "content": "测试一下",
              "seen": 6,
              "isLiked": true,
              "replyList": [
                {
                  "id": "u_10_1_1",
                  "replyMsg": "这个问题怎么解决呢？",
                  "replyUser": {
                    "smallName": "LW",
                    "userName": "Li Wei",
                    "faceColor": "#9370DB",
                    "userUrl": "https://www.baidu.com?liwei"
                  },
                  "isLiked": false,
                  "createTime": "2020-04-05 10:09:24"
                },
                {
                  "id": "u_10_1_2",
                  "replyMsg": "回复<a href='https://www.baidu.com?liwei' target='_blank'>@LiWei :</a>解决这个问题，就要先这样，再那样，就解决了",
                  "replyUser": {
                    "smallName": "ZT",
                    "userName": "Zhang Tao",
                    "faceColor": "#f4617f",
                    "userUrl": "https://www.baidu.com?zhangtao"
                  },
                  "isLiked": true,
                  "createTime": "2020-04-08 20:09:24"
                }
              ]
            },
            {
              "id": "u_10_2",
              "author": {
                "smallName": "L",
                "userName": "Leo",
                "faceColor": "#f49642",
                "userUrl": "https://www.baidu.com?leo"
              },
              "createTime": "2020-04-12 14:09:24",
              "content": "测试一下是否存在问腿",
              "seen": 5,
              "isLiked": false,
              "replyList": []
            }
          ]
        },
        "8": {
          "1": "implement column type 状态/enum （状态参照monday ：）",
          "2": "进行中",
          "3": [{
            "smallName":"Z",
            "userName":"ZhangGuoLi",
            "faceColor":"#66cdff"
          },{
            "smallName":"Z",
            "userName":"Zhang Tao",
            "faceColor":"#f4617f"
          },{
            "smallName":"J",
            "userName":"Jiang Guangzhou",
            "faceColor":"#f49642"
          },{
            "smallName":"M",
            "userName":"MaYing",
            "faceColor":"#f49642"
          }],
          "4": "2020-04-23  8:00PM",
          "5": "",
          "6": ""
        },
        "9": {
          "1": "implement column type priority/enum（priority参照monday: 高，中，低）",
          "2": "已完成",
          "3": [{
            "smallName":"Z",
            "userName":"ZhangGuoLi",
            "faceColor":"#66cdff"
          },{
            "smallName":"Z",
            "userName":"Zhang Tao",
            "faceColor":"#f4617f"
          },{
            "smallName":"M",
            "userName":"MaYing",
            "faceColor":"#f49642"
          }],
          "4": "2020-05-15  8:00PM",
          "5": "",
          "6": ""
        },
        "10": {
          "1": "antd 替换其他ui framework (material ui): sidebar",
          "2": "进行中",
          "3": [{
            "smallName":"J",
            "userName":"Jiang Guangzhou",
            "faceColor":"#f49642"
          },{
            "smallName":"Z",
            "userName":"ZhangGuoLi",
            "faceColor":"#66cdff"
          },{
            "smallName":"Z",
            "userName":"Zhang Tao",
            "faceColor":"#f4617f"
          },{
            "smallName":"M",
            "userName":"MaYing",
            "faceColor":"#f49642"
          }],
          "4": "2020-05-17  5:00PM",
          "5": "",
          "6": "",
          "updateInfo": [
            {
              "id": "u_10_1",
              "author": {
                "smallName": "JGZ",
                "userName": "Jiang Guangzhou",
                "faceColor": "#AFEEEE",
                "userUrl": "https://www.baidu.com?jiangguangzhou"
              },
              "createTime": "2020-04-01 10:09:24",
              "content": "测试一下",
              "seen": 6,
              "isLiked": true,
              "replyList": [
                {
                  "id": "u_10_1_1",
                  "replyMsg": "这个问题怎么解决呢？",
                  "replyUser": {
                    "smallName": "LW",
                    "userName": "Li Wei",
                    "faceColor": "#9370DB",
                    "userUrl": "https://www.baidu.com?liwei"
                  },
                  "isLiked": false,
                  "createTime": "2020-04-05 10:09:24"
                },
                {
                  "id": "u_10_1_2",
                  "replyMsg": "回复<a href='https://www.baidu.com?liwei' target='_blank'>@LiWei :</a>解决这个问题，就要先这样，再那样，就解决了",
                  "replyUser": {
                    "smallName": "ZT",
                    "userName": "Zhang Tao",
                    "faceColor": "#f4617f",
                    "userUrl": "https://www.baidu.com?zhangtao"
                  },
                  "isLiked": true,
                  "createTime": "2020-04-08 20:09:24"
                }
              ]
            },
            {
              "id": "u_10_2",
              "author": {
                "smallName": "L",
                "userName": "Leo",
                "faceColor": "#f49642",
                "userUrl": "https://www.baidu.com?leo"
              },
              "createTime": "2020-04-12 14:09:24",
              "content": "测试一下是否存在问腿",
              "seen": 5,
              "isLiked": false,
              "replyList": []
            }
          ]
        },
        "11": {
          "1": "Add new data for this table",
          "11": "更新表格最新数据",
          "12": "自动保存，提高工作效率"
        },
        "12": {
          "1": "参考monday效果，实现富文本编辑处理",
          "11": "实现右侧item数据加载更新",
          "12": "参考monday效果，实现富文本编辑处理"
        },
        "13": {
          "1": "UI新的风格设计和实现规划",
          "2": "To Do",
          "3": [{
            "smallName":"M",
            "userName":"MaYing",
            "faceColor":"#f49642"
          }],
          "4": "2020-05-20  8:00PM",
          "5": "",
          "6": ""
        },
        "14": {
          "1": "不同board的列关联",
          "2": "已完成",
          "3": [{
            "smallName":"Z",
            "userName":"Zhang Tao",
            "faceColor":"#f4617f"
          }],
          "4": "2020-04-15  8:00PM",
          "5": "",
          "6": "",
          "updateInfo": [
            {
              "id": "u_10_1",
              "author": {
                "smallName": "JGZ",
                "userName": "Jiang Guangzhou",
                "faceColor": "#AFEEEE",
                "userUrl": "https://www.baidu.com?jiangguangzhou"
              },
              "createTime": "2020-04-01 10:09:24",
              "content": "测试一下",
              "seen": 6,
              "isLiked": true,
              "replyList": [
                {
                  "id": "u_10_1_1",
                  "replyMsg": "这个问题怎么解决呢？",
                  "replyUser": {
                    "smallName": "LW",
                    "userName": "Li Wei",
                    "faceColor": "#9370DB",
                    "userUrl": "https://www.baidu.com?liwei"
                  },
                  "isLiked": false,
                  "createTime": "2020-04-05 10:09:24"
                },
                {
                  "id": "u_10_1_2",
                  "replyMsg": "回复<a href='https://www.baidu.com?liwei' target='_blank'>@LiWei :</a>解决这个问题，就要先这样，再那样，就解决了",
                  "replyUser": {
                    "smallName": "ZT",
                    "userName": "Zhang Tao",
                    "faceColor": "#f4617f",
                    "userUrl": "https://www.baidu.com?zhangtao"
                  },
                  "isLiked": true,
                  "createTime": "2020-04-08 20:09:24"
                }
              ]
            },
            {
              "id": "u_10_2",
              "author": {
                "smallName": "L",
                "userName": "Leo",
                "faceColor": "#f49642",
                "userUrl": "https://www.baidu.com?leo"
              },
              "createTime": "2020-04-12 14:09:24",
              "content": "测试一下是否存在问腿",
              "seen": 5,
              "isLiked": false,
              "replyList": []
            }
          ]
        }
      },
      "subRows": {
        "2": {
          "rows": [
            "11",
            "12"
          ],
          "isExpanded": false
        }
      }
    }
