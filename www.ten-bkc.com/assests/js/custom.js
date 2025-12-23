async function saveLead(e, t, n, i, l, o) {
    if ("+91" === n) {
        let r = i.replace(/\D/g, "");
        if (10 !== r.length || /^[1-5]/.test(r)) {
            alert("Invalid phone number. For Indian numbers, enter a valid 10-digit number starting with 6-9.");
            return false;
        }
    }

    let a = document.querySelector(".dropnOtp");
    if (a && a.value === "" && parseInt(i)) {
        try {
            let u = await fetch("https://api.homesfy.in/api/users/send_otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: parseInt(i) })
            });
            if (u.ok) {
                let d = await u.json();
                a.value = d.otp;
            }
        } catch (m) {
            console.error("Error sending OTP:", m);
        }
    }

    let s = [".FillOtp", ".FillOtp1", ".FillOtp2"].map((e) => document.querySelector(e)).filter((e) => e);
    if (!a || (a.value !== "" && s.some((e) => a.value === e.value))) {
        let c = queryForm(),
            p = await getIpAddress(),
            g = deviceData(),
            f = browserData(),
            y = {
                name: e,
                email: t,
                country_code: n,
                number: i,
                tracking_lead_id: l,
                nationality: 1,
                source_id: 31,
                project_id: projectId,
                Digital: {
                    user_device: g,
                    user_browser: f,
                    campaing_type: c ? c.utmcampaign : null,
                    launch_name: "",
                    client_ipaddress: p,
                    client_pref: o
                }
            };

        if (c) {
            y.Utm = {
                utm_medium: c.utmmedium,
                utm_source: c.utmsource,
                utm_content: c.utmcontent,
                utm_term: c.utmterm
            };
        }

        if (is_magnet === 1) {
            y.is_magnet = is_magnet;
            y.magnet_id = magnet_id;
            y.source_id = 49;
        }

        localStorage.setItem("submittedCountryCode", n);
        localStorage.setItem("submittedPhone", i);

        // ✅ Only phone number pushed to GTM
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'formSubmitted',
            phone_number: `${n}${i}`
        });

        SendLead(y, "thankyou.html");
    } else if (a && a.value !== "") {
        alert("Invalid OTP");
        return false;
    }
}

function setupToggleButton(e, t, n) {
    let i = document.getElementById(e);
    if (i) {
        i.addEventListener("click", function () {
            toggleVisibility(t, "block");
            toggleVisibility(n, "none");
        });
    }
}

function toggleVisibility(e, t) {
    document.querySelectorAll(`.${e}`).forEach((el) => {
        el.style.display = t;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    apiDataGet(projectId);

    ["ModalFormSlug1", "ModalFormSlug2", "ModalFormSlug3", "ModalFormSlug4"].forEach((formId) => {
        let form = document.getElementById(formId);
        if (form) {
            form.addEventListener("submit", function (e) {
                e.preventDefault();
                let name = form.querySelector(".form-name").value;
                let country = form.querySelector(".form-country").value;
                let number = form.querySelector(".form-number").value;
                let trackingId = form.dataset.trackingId || "default_tracking_id";

                saveLead(name, null, country, number, trackingId);
            });
        }
    });

    setupToggleButton("dropbtn", "showdrop", "hidedrop");
    setupToggleButton("mbutton", "mfieldshow", "mfieldhide");
    setupToggleButton("popbutton", "popfieldshow", "popfieldhide");
});
