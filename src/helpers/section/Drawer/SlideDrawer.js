import React, { PureComponent, createRef } from 'react';
import {
  PauseOutlined,
  CloseOutlined
} from '@ant-design/icons'
import './SlideDrawer.less'
import { connect } from 'react-redux'
import { dealRowHeaderDrawer } from '../../../maintable/actions/rowActions'

@connect(null, { dealRowHeaderDrawer })
class SlideDrawer extends PureComponent {
  constructor(props) {
    const draweDefaultWidth = 600
    super(props)
    this.state = {
      isShowMisk: false,
      draweDefaultWidth: draweDefaultWidth,
      dawrerStyle: this.getDrawerStyle(props.dawrerStyle, draweDefaultWidth),
      isResizing: false,
      isVisible: props.isVisible
    }

    this.drawerContent = createRef()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isVisible: nextProps.isVisible,
    })
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleDrawerResize);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleDrawerResize);
  }

  showMisk = (e) => {
    this.setState({
      isShowMisk: true
    })
  }

  hiddenMisk = (e) => {
    this.setState({
      isShowMisk: false
    })
  }

  // 检查传来的宽度是否比默认宽度小
  getDrawerStyle = (dawrerStyle, draweDefaultWidth) => {
    let dawrerStyleCopy = Object.assign({}, dawrerStyle)
    if (dawrerStyle) {
      if (dawrerStyle.width) {
        if (dawrerStyle.width < draweDefaultWidth) {
          dawrerStyleCopy.width = draweDefaultWidth
        }
      }
      else {
        dawrerStyleCopy.width = draweDefaultWidth
      }
    }
    else {
      dawrerStyleCopy = {}
      dawrerStyleCopy.width = draweDefaultWidth
    }
    return dawrerStyleCopy
  }

  handleResizeDown = (e) => {
    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation();
    this.drawerContent.current.onmouseenter = null
    this.drawerContent.current.onmouseleave = null
    this.setState({
      isResizing: true,
    })
  }

  handleDrawerResize = (e) => {
    if (!this.state.isResizing) return
    e.preventDefault()
    e.stopPropagation()
    const { draweDefaultWidth, dawrerStyle } = this.state
    if (e.clientX < 300 || (window.innerWidth - e.clientX) < draweDefaultWidth) return
    let drawerWidth = window.innerWidth - e.clientX
    let dawrerStyleCopy = Object.assign({}, dawrerStyle)
    dawrerStyleCopy.width = drawerWidth > draweDefaultWidth ? drawerWidth : draweDefaultWidth
    this.setState({
      dawrerStyle: dawrerStyleCopy,
      isShowMisk: true
    })
  }

  handleMouseUp = (e) => {
    e.preventDefault()
    this.drawerContent.current.onmouseenter = this.showMisk
    this.drawerContent.current.onmouseleave = this.hiddenMisk
    this.setState({
      isResizing: false
    })
  }

  closeDrawer = (e) => {
    this.setState({
      isVisible: false,
      isShowMisk: false
    })
    this.props.dealRowHeaderDrawer({isOpenRowHeaderDrawer: false})
  }

  render() {
    const { isShowMisk, dawrerStyle, isVisible } = this.state
    const { headerStyle, bodyStyle, drawerHeader, children } = this.props
    return (
      <div className={isVisible ? 'slide_drawer open' : 'slide_drawer'} style={dawrerStyle}>
        <div className={isShowMisk ? 'slide_drawer_overlay show_misk' : 'slide_drawer_overlay'}>

        </div>
        <div
          ref={this.drawerContent}
          className="slide_drawer_content"
          onMouseEnter={this.showMisk}
          onMouseLeave={this.hiddenMisk}
        >
          <div
            className="slide_drawer_resizer"
            onMouseDown={this.handleResizeDown}
          >
            <i className="slide_drawer_resizer_drag">
              <PauseOutlined />
            </i>
          </div>
          <div className="slide_drawer_container">
            <div className="slide_drawer_container_header" style={headerStyle ? headerStyle : {}}>
              <div className="slide_drawer_container_header_title">
                <div  className="slide_drawer_container_close">
                  <a className="slide_drawer_container_close_btn" onClick={this.closeDrawer}>
                    <CloseOutlined style={{fontSize: 16}} />
                  </a>
                </div>
                <div className="slide_drawer_container_header_breadcrumbs" />
                <div className="slide_drawer_container_header_editable_component">
                  <h1 className="editable_click">
                    {
                      drawerHeader
                    }
                  </h1>
                </div>
              </div>
            </div>
            <div className="slide_drawer_container_body" style={bodyStyle ? bodyStyle : {}}>
              {
                children
              }
            </div>  
          </div>
        </div>
      </div>
    );
  }
}

export default SlideDrawer;