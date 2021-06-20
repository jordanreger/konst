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
          font-size: 4vw;
        }

        input[type="text"] {
          font-size: 4vw;
        }

        ul {
          font-size: 4vw;
        }
      }

      @media only screen and (min-width: 600px) {
        .page {
          width: 50%;
          height: 75%;
          top: 50%;
        }

        #username {
          font-size: 1.25vw;
        }

        input[type="text"] {
          font-size: 1.25vw;
        }

        ul {
          font-size: 1.25vw;
        }
      }

      /* page css */
      .page {
        border-radius: 10px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        display: grid;
        grid-auto-rows: 1fr;
        grid-template-columns: 1fr;
        grid-template-rows: 15fr 1fr;
        gap: 0px 0px;
        grid-template-areas:
          "terminal"
          "command-line";
      }

      .terminal {
        grid-area: terminal;
        position: absolute;
        width: 100%;
        height: 100%;
      }

      .terminal::-webkit-scrollbar {
        display: none;
      }

      ul {
        position: absolute;
        left: 0;
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
        color: #c4c4c4;
      }

      li:first-child {
        padding-top: 1vh;
      }

      li:not(:last-child) {
        padding-bottom: 1vh;
      }

      .command-line {
        grid-area: command-line;
        position: absolute;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: min-content auto;
      }

      #username {
        position: relative;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        color: #c4c4c4;
      }

      input[type="text"] {
        position: relative;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        font-family: IBM Plex Mono;
        background-color: transparent;
        outline: none;
        border: none;
        color: #c4c4c4;
        margin-left: 0.5vw;
      }
    `;
  }

  constructor() {
    super();
    this.username = "user";
  }

  async handleCmd(e, val){
    if(e !== undefined){
      e.preventDefault();
    }
    //console.log(this.shadowRoot);
    let page = this.shadowRoot.childNodes[2].childNodes;
    let list = page[1].childNodes[1];
    let value, form;
    for(var i = 0; i < page.length; i++){
      if(page[i].className === "command-line"){
        form = page[i];
        if(val === undefined){
          value = page[i].childNodes[3].childNodes[0].value;
        } else {
          value = val;
        }
      }
    }

    var br = document.createElement("br");
    list.appendChild(br);
    list.scrollTop = list.scrollHeight;

    var cmd = document.createElement("li");
    cmd.appendChild(document.createTextNode(`konst.${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}> ${value}`));
    list.appendChild(cmd);
    //var br = document.createElement("br");
    //list.appendChild(br);

    if(value.includes(",")){
      let cmds = value.split(", ");
      //console.log(cmds.length);
      /*for(var i = 0; i < cmds.length; i++){
        console.log(cmds[i]);
      }*/
      for(var i = 0; i < cmds.length; ++i){
        this.handleCmd(undefined, cmds[i]);
      }
    }

    if(value.includes("echo")){
      var li = document.createElement("li");
      if(!value.includes(",")){
        li.appendChild(document.createTextNode(`${value.trim().split("echo ").pop()}`));
        list.appendChild(li);
        list.scrollTop = list.scrollHeight;
        form.reset();
      }
    }

    else if(value.includes("clear")){
      if(value === "clear"){
        list.innerHTML = "";
        form.reset();
      }
    }

    /*else if(value.includes("import")){
      if(value.split("import ").pop() !== ""){
        var url = value.split("import ").pop();
        var response = fetch(url).then(response => { if(response.url !== `${window.location.href}${url}`){ return response.text() } else { return `cannot import from ${url}` } }).then(data => {
          var li = document.createElement("li");
          if(data !== `cannot import from ${url}`){
            var data = JSON.parse(data);
            if(!localStorage.getItem(`${data.name}`)){
              localStorage.setItem(`${data.name}`, JSON.stringify(data));
              li.appendChild(document.createTextNode(`konst.${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}> imported "${data.name}"`));
            } else {
              li.appendChild(document.createTextNode(`konst.${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}> "${data.name}" exists already. try using "${data.name}"`));
            }
          } else {
            li.appendChild(document.createTextNode(`konst.${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}> error: ${data}`));
          }
          list.appendChild(li);
          list.scrollTop = list.scrollHeight;
        });
        form.reset();
      }
    }

    else if(value.includes("install")){
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(`konst.${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}> please use the command "import"`));
      list.appendChild(li);
      list.scrollTop = list.scrollHeight;
      form.reset();
    }

    else if(value.includes("eval")){
      var mod = value.split("eval ").pop();
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(`konst.${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}> ${JSON.parse(localStorage.getItem(`${mod}`)).function}`));
      list.appendChild(li);
      list.scrollTop = list.scrollHeight;
      form.reset();
    }

    else if(value.includes("uninstall")){
      if(value.split("uninstall ").pop() !== ""){
        var url = value.split("uninstall ").pop();
        if(localStorage.getItem(`${url}`)){
          localStorage.removeItem(`${url}`)
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(`konst.${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}> uninstalled "${url}"`));
          list.appendChild(li);
          list.scrollTop = list.scrollHeight;
          form.reset();
        } else {
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(`konst.${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}> can't find mod "${url}"`));
          list.appendChild(li);
          list.scrollTop = list.scrollHeight;
          form.reset();
        }
      }
    }

    else if(!value.includes("echo") || !value.includes("clear") || !value.includes("install") || !value.includes("import") || !value.includes("uninstall") || !value.includes("eval")){
      if(value !== ""){
        let fnName = value.split(" ")[0];
        if(localStorage.getItem(`${fnName}`)){
          let fnFunction = JSON.parse(localStorage.getItem(`${fnName}`)).function;
          this.handleCmd(undefined, fnFunction);
          form.reset();
        } else {
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(`konst.${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}> can't find function "${fnName}"`));
          list.appendChild(li);
          list.scrollTop = list.scrollHeight;
          form.reset();
        }
      }
    }*/

    else {
      if(value !== ""){
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(`no command "${value.split(" ")[0]}"`));
        list.appendChild(li);
        list.scrollTop = list.scrollHeight;
        form.reset();
      }
    }

    /*if(value.includes("username")){
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
    }*/
  }

  render() {
    if (window.location.pathname === "/") {
      return html`
      <div class="page">
        <div class="terminal">
          <ul>
          </ul>
        </div>
        <form @submit="${(e) => this.handleCmd(e)}" class="command-line">
          <div class="username">
            <div id="username">konst.${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}></div>
          </div>
          <div class="input"><input type="text" /></div>
        </form>
      </div>
    `;
    } else {
      return undefined;
    }
  }
}
customElements.get("app-lander") || customElements.define("app-lander", Lander);
