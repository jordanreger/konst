import { LitElement, html, css } from "lit-element";
import "latt";
import { until } from "lit-html/directives/until.js";

class Lander extends LitElement {
  static get properties() {
    return {
      username: { type: String }
    };
  }

  static get styles() {
    return css`
      /* app css */
      ::selection {
        color: #c4c4c4;
        background: #424242;
      }

      ::-webkit-scrollbar {
        width: 5px;
      }

      ::-webkit-scrollbar-track {
        background: #a4a4a4;
      }

      ::-webkit-scrollbar-thumb {
        background: #888888;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #555555;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      @media only screen and (max-width: 600px) {
        .page {
          width: 90%;
          height: 90%;
          top: 52.5%;
        }

        #username {
          font-size: 3vw;
        }

        input[type="text"] {
          font-size: 4vw;
        }
      }

      @media only screen and (min-width: 600px) {
        .page {
          width: 50%;
          height: 50%;
          top: 50%;
        }

        #username {
          font-size: 1.25vw;
        }

        input[type="text"] {
          font-size: 1.25vw;
        }
      }

      /* page css */
      .page {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 6fr 1.5fr;
        gap: 2em 0px;
        grid-template-areas:
          "top"
          "command-line";
      }

      .top {
        grid-area: top;
        position: absolute;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 4fr 1fr;
        grid-template-rows: 1fr;
        gap: 0px 2em;
        grid-template-areas:
          "left right";
      }

      .left {
        grid-area: left;
        position: absolute;
        width: 100%;
        height: 100%;
        margin-left: -2.5px;
      }

      .terminal {
        position: absolute;
        width: calc(100% - 3px);
        height: calc(100% - 3px);
        border: 1px solid black;
        background-color: #b4b4b4;
        border-radius: 10px;
        border: 3px solid #888;
        transition: 150ms background-color ease-in-out, 150ms border ease-in-out, 150ms color ease-in-out;
      }

      .terminal:hover {
        border: 3px solid #696969;
        transition: 150ms background-color ease-in-out, 150ms border ease-in-out, 150ms color ease-in-out;
      }

      .terminal::-webkit-scrollbar {
        display: none;
      }

      ul {
        position: absolute;
        left: 1vw;
        margin-top: 2vh;
        bottom: 0vh;
        right: 1vw;
        padding: 0;
        list-style-position: outside;
        list-style-type: none;
        max-height: calc(100% - 2vh);
        overflow-y: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      li:first-child) {
        padding-top: 1vh;
      }

      li:not(:last-child) {
        padding-bottom: 1vh;
      }

      .right {
        grid-area: right;
        position: absolute;
        width: 100%;
        height: 100%;
      }

      #username {
        color: #424242;
        position: inherit;
        right: 0;
        top: 0;
        user-select: none;
      }

      .command-line {
        grid-area: command-line;
        position: absolute;
        width: 100%;
        height: 100%;
      }

      input[type="text"] {
        font-family: IBM Plex Mono;
        background-color: transparent;
        border: 3px solid #888;
        border-radius: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% - 2vw);
        outline: none;
        color: #696969;
        padding-left: 1vw;
        padding-right: 1vw;
        padding-top: 2vh;
        padding-bottom: 2vh;
        transition: 150ms background-color ease-in-out, 150ms border ease-in-out, 150ms color ease-in-out;
      }

      input[type="text"]:hover {
        border: 3px solid #696969;
        transition: 150ms background-color ease-in-out, 150ms border ease-in-out, 150ms color ease-in-out;
      }

      input[type="text"]:focus {
        border: 3px solid #696969;
        background-color: #b4b4b4;
        color: #424242;
        transition: 150ms background-color ease-in-out, 150ms border ease-in-out, 150ms color ease-in-out;
      }
    `;
  }

  constructor() {
    super();
    this.username = "user";
  }

  async handleCmd(e){
    e.preventDefault();

    let functions;
    fetch("https://raw.githubusercontent.com/jordanreger/konst/main/functions.json").then(response => { return response.text() }).then(data => {
      functions = data;
      console.log(functions);
    });
  }
    //console.log(this.shadowRoot);
    /*let page = this.shadowRoot.childNodes[2].childNodes;
    let username = page[1].childNodes[3].childNodes[1].childNodes[1].data;
    let list = page[1].childNodes[1].childNodes[1].childNodes[1];
    let value, form;
    for(var i = 0; i < page.length; i++){
      if(page[i].className === "command-line"){
        form = page[i].childNodes[1];
        value = page[i].childNodes[1].childNodes[1].value;
      }
    }

    //imported mods

    for(var i = 0; i < localStorage.length; i++){
      if(Object.keys(localStorage)[i] !== "username"){
        let mod = JSON.parse(localStorage[Object.keys(localStorage)[i]]);
        if(value.includes(mod.name)){
          if(value === mod.name){
            value = mod.function;
          }
        }
      }
    }

    if(value.includes("echo")){
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(`spelatt> ${value.split("echo ").pop()}`));
      list.appendChild(li);
      list.scrollTop = list.scrollHeight;
      form.reset();
    }

    if(value.includes("clear")){
      if(value === "clear"){
        list.innerHTML = "";
        form.reset();
      }
    }

    if(value.includes("import")){
      if(value.split("import ").pop() !== ""){
        var url = value.split("import ").pop();
        var response = fetch(url).then(response => { if(response.url !== `${window.location.href}${url}`){ return response.text() } else { return `cannot import from ${url}` } }).then(data => {
          var li = document.createElement("li");
          if(data !== `cannot import from ${url}`){
            var data = JSON.parse(data);
            localStorage.setItem(`${data.name}`, JSON.stringify(data));
            // add localStorage check for mod
            li.appendChild(document.createTextNode(`spelatt> imported "${data.name}"`));
          } else {
            li.appendChild(document.createTextNode(`spelatt> error: ${data}`));
          }
          list.appendChild(li);
          list.scrollTop = list.scrollHeight;
        });
        form.reset();
      }
    }

    if(value.includes("uninstall")){
      if(value.split("uninstall ").pop() !== ""){
        var url = value.split("uninstall ").pop();
        if(localStorage.getItem(`${url}`)){
          localStorage.removeItem(`${url}`)
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(`spelatt> uninstalled "${url}"`));
          list.appendChild(li);
          list.scrollTop = list.scrollHeight;
          form.reset();
        } else {
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(`spelatt> can't find mod "${url}"`));
          list.appendChild(li);
          list.scrollTop = list.scrollHeight;
          form.reset();
        }
      }
    }

    if(value.includes("username")){
      if(value.includes(":")){
        if(value.split("username:").pop() !== ""){
          this.username = value.split("username:").pop();
          localStorage.setItem("username", this.username);
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(`spelatt> username set to ${this.username}`));
          list.appendChild(li);
          list.scrollTop = list.scrollHeight;
          form.reset();
        } else {
          // send err
        }
      } else {
        if(value.split("username ").pop() === "clear"){
          this.username = "user";
          localStorage.setItem("username", this.username);
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(`spelatt> username cleared`));
          list.appendChild(li);
          list.scrollTop = list.scrollHeight;
          form.reset();
        }
      }
    }
  }*/

  render() {
    if (window.location.pathname === "/") {
      return html`
      <div class="page">
        <div class="top">
          <div class="left">
            <div class="terminal">
              <ul>
              </ul>
            </div>
          </div>
          <div class="right">
            <div id="username">${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}</div>
          </div>
        </div>
        <div class="command-line">
          <form @submit="${(e) => this.handleCmd(e)}">
            <input type="text" placeholder="> command line" />
          </form>
        </div>
      </div>
    `;
    } else {
      return undefined;
    }
  }
}
customElements.get("app-lander") || customElements.define("app-lander", Lander);
