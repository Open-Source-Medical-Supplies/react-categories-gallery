import React, { Component } from "react";
import classNames from "classnames";
import DomHandler from "primereact/components/utils/DomHandler";

export default class DetailWindow extends Component {
  // adapted from the PrimeReact Sidebar component
  static defaultProps = {
    id: null,
    style: null,
    className: null,
    visible: false,
    position: "right",
    fullScreen: false,
    blockScroll: false,
    baseZIndex: 0,
    dismissable: true,
    showCloseIcon: true,
    ariaCloseLabel: "close",
    closeOnEscape: true,
    iconsTemplate: null,
    modal: false,
    onShow: null,
    onHide: null,
  };

  constructor(props) {
    super(props);
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  componentDidMount() {
    if (this.props.visible) {
      this.onShow();
    }
  }

  componentWillUnmount() {
    this.unbindMaskClickListener();
    this.disableModality();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.visible !== this.props.visible) {
      this.props.visible ? this.onShow() : this.onHide();
    }

    if (this.mask && prevProps.dismissable !== this.props.dismissable) {
      this.props.dismissable ? this.bindMaskClickListener() : this.unbindMaskClickListener();
    }
  }

  onShow() {
    this.container.style.zIndex = String(
      this.props.baseZIndex + DomHandler.generateZIndex()
    );

    if (this.props.modal) {
      this.enableModality();
    }

    if (this.props.closeOnEscape) {
      this.bindDocumentEscapeListener();
    }

    if (this.closeIcon) {
      this.closeIcon.focus();
    }

    if (this.props.onShow) {
      this.props.onShow();
    }
  }

  enableModality() {
    if (!this.mask) {
      this.mask = document.createElement("div");
      this.mask.style.zIndex = String(
        parseInt(this.container.style.zIndex, 10) - 1
      );
      let maskStyleClass = "p-component-overlay p-sidebar-mask";

      if (this.props.blockScroll) {
        maskStyleClass += " p-sidebar-mask-scrollblocker";
      }
      
      DomHandler.addMultipleClasses(this.mask, maskStyleClass);

      if (this.props.dismissable) {
        this.bindMaskClickListener();
      }

      document.body.appendChild(this.mask);

      if (this.props.blockScroll) {
        DomHandler.addClass(document.body, "p-overflow-hidden");
      }
    }
  }

  disableModality() {
    if (this.mask) {
      this.unbindMaskClickListener();
      document.body.removeChild(this.mask);

      if (this.props.blockScroll) {
        let bodyChildren = document.body.children;
        let hasBlockerMasks;
        for (let i = 0; i < bodyChildren.length; i++) {
          let bodyChild = bodyChildren[i];
          if (DomHandler.hasClass(bodyChild, "p-sidebar-mask-scrollblocker")) {
            hasBlockerMasks = true;
            break;
          }
        }

        if (!hasBlockerMasks) {
          DomHandler.removeClass(document.body, "p-overflow-hidden");
        }
      }
      this.mask = null;
    }
  }

  onCloseClick(event) {
    this.props.onHide();
    event.preventDefault();
  }

  onHide() {
    this.unbindMaskClickListener();
    this.unbindDocumentEscapeListener();

    if (this.props.modal) {
      this.disableModality();
    }
  }

  bindDocumentEscapeListener() {
    this.documentEscapeListener = (event) => {
      if (event.which === 27) {
        if (
          parseInt(this.container.style.zIndex, 10) ===
          DomHandler.getCurrentZIndex() + this.props.baseZIndex
        ) {
          this.onCloseClick(event);
        }
      }
    };
    document.addEventListener("keydown", this.documentEscapeListener);
  }

  unbindDocumentEscapeListener() {
    if (this.documentEscapeListener) {
      document.removeEventListener("keydown", this.documentEscapeListener);
      this.documentEscapeListener = null;
    }
  }

  bindMaskClickListener() {
    if (!this.maskClickListener) {
      this.maskClickListener = (event) => {
        this.onCloseClick(event);
      };
      this.mask.addEventListener("click", this.maskClickListener);
    }
  }

  unbindMaskClickListener() {
    if (this.maskClickListener) {
      this.mask.removeEventListener("click", this.maskClickListener);
      this.maskClickListener = null;
    }
  }

  renderCloseIcon() {
    return (
      <button
        type="button"
        ref={(el) => (this.closeIcon = el)}
        className="p-sidebar-close p-link close-button"
        onClick={this.onCloseClick}
        aria-label={this.props.ariaCloseLabel}
      >
        <span className="p-sidebar-close-icon pi pi-times" />
      </button>
    );
  }

  render() {
    const className = classNames(
      "p-sidebar p-component",
      this.props.className,
      "p-sidebar-" + this.props.position,
      {
        "p-sidebar-active": this.props.visible,
        "p-sidebar-full": this.props.fullScreen,
      }
    );
    const closeIcon = this.renderCloseIcon();

    return (
      <div
        ref={(el) => (this.container = el)}
        id={this.props.id}
        className={className}
        style={{height: '100%', ...this.props.style}}
        role="complementary"
      >
        {closeIcon}
        {this.props.children}
      </div>
    );
  }
}
