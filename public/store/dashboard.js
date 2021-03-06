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
        "name": "Bug描述",
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
        "columnKey": "5",
        "name": "提出人",
        "width": 200,
        "type": "EDITBOX",
        "columnComponentType": "PEOPLE",
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
        "name": "分解Bug",
        "width": 350,
        "type": "EDITBOX",
        "columnComponentType": "TEXT",
        "collpse": false,
        "fixed": true,
        "level": 1
      },
      {
        "columnKey": "10",
        "name": "问题描述",
        "width": 200,
        "type": "EDITBOX",
        "columnComponentType": "TEXT",
        "collpse": false,
        "level": 1
      },
      {
        "columnKey": "11",
        "name": "问题修改记录",
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
        "name": "已关闭",
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
        "name": "解决中",
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
        "name": "未开始",
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
        "1": "体验：列标题不能为空，当用户全部删除列标题后返回或确认时列标题仍显示未删除前文字",
        "2": "已完成",
        "3": [{
                "smallName":"J",
                "userName":"Jiang Guangzhou",
                "faceColor":"#f49642"
              }],
        "4": "2020-03-12  5:00PM",
        "5": [{
            "smallName":"Z",
            "userName":"ZhangGuoLi",
            "faceColor":"#66cdff"
        }],
        "6": "补充说明 1"
      },
      "2": {
        "1": "人员列的宽带需要调整，参考minday的“assigned to” 人员列宽度",
        "2": "已完成",
        "3": [{
          "smallName":"Z",
          "userName":"ZhangGuoLi",
          "faceColor":"#66cdff"
        }],
        "4": "2020-03-09  8:00PM",
        "5": [{
            "smallName":"Z",
            "userName":"ZhangGuoLi",
            "faceColor":"#66cdff"
        }],
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
        "1": "不同section拥有同一个列名，修改一个列名，所有section的列名需要一致",
        "2": "已完成",
        "3": [{
          "smallName":"J",
          "userName":"Jiang Guangzhou",
          "faceColor":"#f49642"
        }],
        "4": "2020-03-16  6:00PM",
        "5": [{
            "smallName":"Z",
            "userName":"ZhangGuoLi",
            "faceColor":"#66cdff"
        }],
        "6": ""
      },
      "4": {
        "1": "1. 建立日期列 2， 添加新section 3. 新section 添加新列 4. 日期列出现 “invalid date”",
        "2": "已完成",
        "3": [{
          "smallName":"J",
          "userName":"Jiang Guangzhou",
          "faceColor":"#f49642"
        }],
        "4": "2020-03-11  8:00PM",
        "5": [{
            "smallName":"Z",
            "userName":"ZhangGuoLi",
            "faceColor":"#66cdff"
        }],
        "6": ""
      },
      "5": {
        "1": "功能：工作区折叠后无法再展开",
        "2": "已完成",
        "3": [{
          "smallName":"J",
          "userName":"Jiang Guangzhou",
          "faceColor":"#f49642"
        }],
        "4": "2020-04-09  5:00PM",
        "5": [{
            "smallName":"Z",
            "userName":"ZhangGuoLi",
            "faceColor":"#66cdff"
        }],
        "6": ""
      },
      "6": {
        "1": "体验：列标题不能为空，当用户全部删除列标题后返回或确认时列标题仍显示未删除前文字",
        "2": "已完成",
        "3": [{
          "smallName":"J",
          "userName":"Jiang Guangzhou",
          "faceColor":"#f49642"
        }],
        "4": "2020-04-11  5:00PM",
        "5": [{
            "smallName":"Z",
            "userName":"ZhangGuoLi",
            "faceColor":"#66cdff"
        }],
        "6": ""
      },
      "7": {
        "1": "4/2 从分区菜单中添加分区后，新添加的分区名为一个随机数",
        "2": "进行中",
        "3": [{
          "smallName":"Z",
          "userName":"ZhangGuoLi",
          "faceColor":"#66cdff"
        }],
        "4": "2020-04-27  8:00PM",
        "5": [{
            "smallName":"Z",
            "userName":"ZhangGuoLi",
            "faceColor":"#66cdff"
        }],
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
        "1": "功能：参考Monday的折叠所有分区和展开所有分区功能，在有分区被折叠的情况下，只有一个分区处于展开状态，这个分区的菜单中的“折叠所有分区”功能变成“展开所有分区”",
        "2": "进行中",
        "3": [{
          "smallName":"J",
          "userName":"Jiang Guangzhou",
          "faceColor":"#f49642"
        }],
        "4": "2020-04-27  8:00PM",
        "5": [{
            "smallName":"Z",
            "userName":"ZhangGuoLi",
            "faceColor":"#66cdff"
        }],
        "6": ""
      },
      "9": {
        "1": "日期选择控件没有跟随对应单元格，左右或上下滚动界面时始终留在原位导致错位",
        "2": "To Do",
        "3": [{
          "smallName":"Z",
          "userName":"Zhang Tao",
          "faceColor":"#f4617f"
        }],
        "4": "2020-05-15  8:00PM",
        "5": [{
            "smallName":"Z",
            "userName":"ZhangGuoLi",
            "faceColor":"#66cdff"
        }],
        "6": ""
      },
      "10": {
        "1": "4/9 在搜索框中输入关键字，返回行项命中关键字亮显时没有把所有命中内容都亮显",
        "2": "To Do",
        "3": [{
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
        "10": "更新表格最新数据",
        "11": "自动保存，提高工作效率"
      },
      "12": {
        "1": "参考monday效果，实现富文本编辑处理",
        "10": "实现右侧item数据加载更新",
        "11": "参考monday效果，实现富文本编辑处理"
      },
      "13": {
        "1": "4/2 选择人员控件不跟随对应单元格，左右或上下滚动界面时始终留在原位导致错位",
        "2": "To Do",
        "3": [{
          "smallName":"M",
          "userName":"MaYing",
          "faceColor":"#f49642"
        }],
        "4": "2020-04-25  8:00PM",
        "5": [{
            "smallName":"Z",
            "userName":"ZhangGuoLi",
            "faceColor":"#66cdff"
        }],
        "6": ""
      },
      "14": {
        "1": "3/23 日历控件中的“清除”无效果，见附件",
        "2": "To Do",
        "3": [{
          "smallName":"Z",
          "userName":"Zhang Tao",
          "faceColor":"#f4617f"
        }],
        "4": "2020-04-15  8:00PM",
        "5": [{
            "smallName":"Z",
            "userName":"ZhangGuoLi",
            "faceColor":"#66cdff"
        }],
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
