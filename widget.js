function initializeRingSizer() {
    let app_url = document.getElementById("ring-sizer").getAttribute("data-domain") || "ringsizer.grownbrilliance.com";
    let store_code = document.getElementById("ring-sizer").getAttribute("data-store_code");
    let ring_sizer_url = `https://${app_url}/ring-size-calculator/${store_code}`;
    let iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    let body = document.body;

    // Create backdrop and wrapper for the modal
    let backdrop = document.createElement("div");
    backdrop.id = "backdrop_ring_sizer";
    Object.assign(backdrop.style, {
        display: "none", position: "fixed", zIndex: "9999999999",
        top: "0", left: "0", right: "0", bottom: "0",
        backgroundColor: "#00000055"
    });

    let wrapper = document.createElement("div");
    wrapper.id = "wrapper_ring_sizer";
    Object.assign(wrapper.style, {
        position: "fixed", maxWidth: "1100px", maxHeight: "99%", 
        margin: "auto", borderRadius: "5px", backgroundColor: "#ffffff",
        boxShadow: "0px 0px 10px 5px #22222255"
    });

    if (iOS) {
        const version = navigator.appVersion.match(/OS (\d+)_/);
        if (version && parseInt(version[1], 10) < 13) {
            wrapper.style.cssText += 'overflow:auto;-webkit-overflow-scrolling:touch';
        }
    }

    // Create iframe
    let iframe = document.createElement("iframe");
    iframe.id = "ifrm_ring_sizer";
    Object.assign(iframe.style, { width: "100%", height: "100%", display: "block" });
    iframe.frameBorder = "0";

    // Append elements
    wrapper.appendChild(iframe);
    backdrop.appendChild(wrapper);
    body.appendChild(backdrop);

    // Event listeners
    document.getElementById("ring-sizer").addEventListener("click", () => openIframe());
    
    window.addEventListener("message", (e) => {
        let origin_url = e.origin.replace(/https?:\/\//, '').split(/[/?#]/)[0];
        if (origin_url === app_url && e.data === "close_iframe") {
            closeIframe();
        }
    });

    // Functions to open and close iframe
    function openIframe() {
        iframe.src = ring_sizer_url;
        backdrop.style.display = "block";
    }

    function closeIframe() {
        iframe.src = "";
        backdrop.style.display = "none";
    }
}

initializeRingSizer();
