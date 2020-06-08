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
    const drawerDefaultWidth = 600
    super(props)
    this.state = {
      isShowMask: false,
      drawerDefaultWidth: drawerDefaultWidth,
      drawerStyle: this.getDrawerStyle(props.drawerStyle, drawerDefaultWidth),
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

  showMask = (e) => {
    this.setState({
      isShowMask: true
    })
  }

  hiddenMask = (e) => {
    this.setState({
      isShowMask: false
    })
  }

  // 检查传来的宽度是否比默认宽度小
  getDrawerStyle = (drawerStyle, drawerDefaultWidth) => {
    let drawerStyleCopy = Object.assign({}, drawerStyle)
    if (drawerStyle) {
      if (drawerStyle.width) {
        if (drawerStyle.width < drawerDefaultWidth) {
          drawerStyleCopy.width = drawerDefaultWidth
        }
      }
      else {
        drawerStyleCopy.width = drawerDefaultWidth
      }
    }
    else {
      drawerStyleCopy = {}
      drawerStyleCopy.width = drawerDefaultWidth
    }
    return drawerStyleCopy
  }

  handleResizeDown = (e) => {
    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation();
    this.drawerContent.current.onmouseover = null
    this.drawerContent.current.onmouseout = null
    this.setState({
      isResizing: true,
    })
  }

  handleDrawerResize = (e) => {
    if (!this.state.isResizing) return
    e.preventDefault()
    e.stopPropagation()
    const { drawerDefaultWidth, drawerStyle } = this.state
    if (e.clientX < 300 || (window.innerWidth - e.clientX) < drawerDefaultWidth) return
    let drawerWidth = window.innerWidth - e.clientX
    let drawerStyleCopy = Object.assign({}, drawerStyle)
    drawerStyleCopy.width = drawerWidth > drawerDefaultWidth ? drawerWidth : drawerDefaultWidth
    this.setState({
      drawerStyle: drawerStyleCopy,
      isShowMask: true
    })
  }

  handleMouseUp = (e) => {
    e.preventDefault()
    this.drawerContent.current.onmouseover = this.showMask
    this.drawerContent.current.onmouseout = this.hiddenMask
    this.setState({
      isResizing: false
    })
  }

  closeDrawer = (e) => {
    this.setState({
      isVisible: false,
      isShowMask: false
    })
    this.props.dealRowHeaderDrawer({isOpenRowHeaderDrawer: false})
  }

  render() {
    const { isShowMask, drawerStyle, isVisible } = this.state
    const { headerStyle, bodyStyle, drawerHeader, children } = this.props
    return (
      <div className={isVisible ? 'slide_drawer open' : 'slide_drawer'} style={drawerStyle}>
        <div 
          className={isShowMask ? 'slide_drawer_overlay show_mask' : 'slide_drawer_overlay'}
        />
        <div
          ref={this.drawerContent}
          className="slide_drawer_content"
          onMouseEnter={this.showMask}
          onMouseLeave={this.hiddenMask}
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