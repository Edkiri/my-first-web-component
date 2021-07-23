
class MyCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  static get observedAttributes() {
    return ['img', 'link'];
  }
  attributeChangedCallback(attr, oldVal, newVal) {
    if(attr === 'img') {
      this.img = newVal;
    }
    if(attr === 'link') {
      this.link = newVal;
    }
  }
  getTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
      <article>
        <div class="header">
          <h2>
            <slot name="brand"></slot>
          </h2>
          <img src="${this.img}" />
        </div>
        <div class="content">
          <h1>
            <span class="title"><slot name="title"></slot></span>
            <span class="sub-title"><slot name="sub-title"></slot></span>
          </h1>
          <p>
            <slot name="paragraph"></slot>
          </p>
          <div class="call-to-action">
            <span class="price">
              <slot name="price"></slot>
            </span>
            <a href="${this.link}">buy now</a>
          </div>
        </div>
      </article>
      ${this.getStyles()}
    `;
    return template;
  }
  getStyles() {
    return `
    <style>
      * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }
      :host {
        --mobile-min-width: 300px;
        --mobile-max-width: 450px;
        --desktop-min-width: 700px;
        --desktop-max-width: 950px;
        --header-color: #5a6cb2;
      }
      article {
        width: 100%;
        min-width: var(--mobile-min-width);
        max-width: var(--mobile-max-width);
        font-family: Helvetica;
      }
      .header {
        width: 100%;
        background: var(--header-color);
        height: 250px;
        padding: 25px 20px;
        text-transform: capitalize;
        font-size: 55px;
        color: rgba(0, 0, 0, 0.226);
        position: relative;
        margin-bottom: 35px;
      }
      img {
        width: 85%;
        position: absolute;
        bottom: -55px;
      }
      .content {
        padding: 20px 20px 40px 20px;
      }
      h1 {
        line-height: 35px;
      }
      .title {
        font-size: 38px;
      }
      .sub-title {
        text-transform: uppercase;
        color: gray;
        font-size: 18px;
      }
      p {
        padding: 25px 0px;
      }
      .call-to-action {
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding
      }
      .price {
        font-size: 36px;
        color: gray;
        font-weight: 700;
      }
      a {
        text-decoration: none;
        text-transform: uppercase;
        color: white;
        background: var(--header-color);
        border-radius: 20px;
        padding: 5px 20px;
        line-height: 32px;
        font-weight: 700;
      }
      @media screen and (min-width: 800px) {
        article {
          display: flex;
          width: 100%;
          min-width: var(--desktop-min-width);
          max-width: var(--desktop-max-width);
          margin: 0 25px;
        }
        .header {
          height: auto;
          margin-bottom: 0px;
          width: 50%;
        }
        img {
          width: 600px;
          transform: rotate(-25deg);
          bottom: 15px;
          left: -150px;
        }
        .content {
          width: 50%;
          height: 100%;
          padding: 40px 20px 60px 20px;
        }
        p {
          margin-left: 50px;
        }
      }
    </style>
    `;
  }
  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define('my-card', MyCard);