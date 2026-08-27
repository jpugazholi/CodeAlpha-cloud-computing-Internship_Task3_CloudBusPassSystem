const API_BASE_URL =
    "https://codealpha-cloud-computing-internship-keud.onrender.com/api";

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
   ADMIN SECURITY - RUN FIRST
========================================================= */

if (
    window.location.pathname.endsWith("admin-dashboard.html")
) {
    const adminLoggedIn =
        localStorage.getItem("adminLoggedIn");

    if (adminLoggedIn !== "true") {
        window.location.href = "login.html";
        return;
    }
}

    /* =========================================================
       API HELPER
    ========================================================= */

    async function apiRequest(url, options = {}) {

        try {

            const response = await fetch(
                API_BASE_URL + url,
                {
                    ...options,
                    headers: {
                        "Content-Type": "application/json",
                        ...(options.headers || {})
                    }
                }
            );

            const text = await response.text();

            let data = null;

            try {
                data = text ? JSON.parse(text) : null;
            } catch {
                data = text;
            }

            if (!response.ok) {

                let message =
                    "Request failed. Please try again.";

                if (
                    typeof data === "string" &&
                    data.trim()
                ) {
                    message = data;
                }

                else if (
                    data &&
                    data.message
                ) {
                    message = data.message;
                }

                throw new Error(message);
            }

            return data;

        }

        catch (error) {

            console.error("API Error:", error);

            if (
                error instanceof TypeError
            ) {

                throw new Error(
                    "Cannot connect to the backend. " +
                    "The Render backend may be waking up. " +
                    "Please wait 30-60 seconds and try again."
                );
            }

            throw error;
        }
    }



    /* =========================================================
       HELPER FUNCTIONS
    ========================================================= */

    function getLoggedInUser() {

        try {

            return JSON.parse(
                localStorage.getItem("loggedInUser")
            );

        } catch {

            return null;
        }
    }


    function requireUser() {

        const user = getLoggedInUser();

        if (!user) {

            window.location.href =
                "login.html";

            return null;
        }

        return user;
    }


    function normalizeStatus(status) {

        if (!status) {
            return "Pending";
        }

        const value =
            String(status).toUpperCase();

        if (value === "APPROVED") {
            return "Approved";
        }

        if (value === "REJECTED") {
            return "Rejected";
        }

        return "Pending";
    }


    function escapeHtml(value) {

        if (
            value === null ||
            value === undefined
        ) {
            return "";
        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }



    /* =========================================================
       REGISTER
    ========================================================= */

    const registerForm =
        document.getElementById("registerForm");


    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const name =
                    document.getElementById("name")
                        .value.trim();

                const email =
                    document.getElementById("email")
                        .value.trim();

                const phone =
                    document.getElementById("phone")
                        .value.trim();

                const password =
                    document.getElementById("password")
                        .value;

                const confirmPassword =
                    document.getElementById(
                        "confirmPassword"
                    ).value;


                /* PASSWORD CHECK */

                if (
                    password !==
                    confirmPassword
                ) {

                    alert(
                        "Passwords do not match."
                    );

                    return;
                }


                /* PHONE CHECK */

                if (
                    !/^\d{10}$/.test(phone)
                ) {

                    alert(
                        "Please enter a valid 10-digit phone number."
                    );

                    return;
                }


                /* USER OBJECT */

                const user = {

                    name: name,

                    email: email,

                    password: password,

                    phone: phone,

                    role: "USER"

                };


                try {

                    await apiRequest(
                        "/users/register",
                        {
                            method: "POST",

                            body:
                                JSON.stringify(user)
                        }
                    );


                    alert(
                        "Registration successful! Please login."
                    );


                    registerForm.reset();


                    window.location.href =
                        "login.html";


                }

                catch (error) {

                    console.error(
                        "Registration Error:",
                        error
                    );

                    alert(
                        "Registration failed:\n\n" +
                        error.message
                    );
                }

            }
        );

    }



    /* =========================================================
       LOGIN
    ========================================================= */

    const loginForm =
        document.getElementById("loginForm");


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const email =
                    document.getElementById(
                        "loginEmail"
                    ).value.trim();


                const password =
                    document.getElementById(
                        "loginPassword"
                    ).value;


                const loginType =
                    document.getElementById(
                        "loginType"
                    ).value;



                /* ================= ADMIN LOGIN ================= */

                if (
                    loginType === "admin"
                ) {

                    const adminEmail =
                        "admin@cloudbuspass.com";

                    const adminPassword =
                        "Admin@123";


                    if (
                        email.toLowerCase() ===
                        adminEmail.toLowerCase() &&

                        password ===
                        adminPassword
                    ) {

                        localStorage.setItem(
                            "adminLoggedIn",
                            "true"
                        );


                        alert(
                            "Admin login successful!"
                        );


                        window.location.href =
                            "admin-dashboard.html";

                    }

                    else {

                        alert(
                            "Invalid admin email or password."
                        );

                    }


                    return;
                }



                /* ================= USER LOGIN ================= */

                try {

                    const user =
                        await apiRequest(
                            "/users/login",
                            {
                                method: "POST",

                                body:
                                    JSON.stringify({
                                        email:
                                            email,

                                        password:
                                            password
                                    })
                            }
                        );


                    localStorage.setItem(
                        "loggedInUser",
                        JSON.stringify(user)
                    );


                    alert(
                        "Login successful!"
                    );


                    window.location.href =
                        "dashboard.html";


                }

                catch (error) {

                    console.error(
                        "Login Error:",
                        error
                    );


                    alert(
                        "Login failed:\n\n" +
                        error.message
                    );

                }

            }
        );

    }



    /* =========================================================
       APPLY PASS
    ========================================================= */

    const applyPassForm =
        document.getElementById(
            "applyPassForm"
        );


    if (applyPassForm) {

        const loggedInUser =
            requireUser();


        if (!loggedInUser) {
            return;
        }


        const passengerName =
            document.getElementById(
                "passengerName"
            );


        const passengerEmail =
            document.getElementById(
                "passengerEmail"
            );


        const passengerPhone =
            document.getElementById(
                "passengerPhone"
            );


        if (passengerName) {

            passengerName.value =
                loggedInUser.name || "";

        }


        if (passengerEmail) {

            passengerEmail.value =
                loggedInUser.email || "";

        }


        if (passengerPhone) {

            passengerPhone.value =
                loggedInUser.phone || "";

        }



        applyPassForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const route =
                    document.getElementById(
                        "busRoute"
                    ).value;


                const passType =
                    document.getElementById(
                        "passType"
                    ).value;


                if (
                    !route ||
                    !passType
                ) {

                    alert(
                        "Please select route and pass type."
                    );

                    return;
                }


                const amount =
                    passType === "Student"
                        ? 500
                        : 1000;


                try {

                    /* CREATE BUS PASS */

                    const busPass =
                        await apiRequest(
                            "/buspasses",
                            {
                                method: "POST",

                                body:
                                    JSON.stringify({

                                        route:
                                            route,

                                        passType:
                                            passType,

                                        amount:
                                            amount

                                    })
                            }
                        );


                    /* CREATE APPLICATION */

                    const application = {

                        user: {
                            id:
                                loggedInUser.id
                        },

                        busPass: {
                            id:
                                busPass.id
                        },

                        status:
                            "PENDING"

                    };


                    await apiRequest(
                        "/applications",
                        {
                            method: "POST",

                            body:
                                JSON.stringify(
                                    application
                                )
                        }
                    );


                    alert(
                        "Bus pass application submitted successfully!"
                    );


                    applyPassForm.reset();


                    window.location.href =
                        "status.html";

                }

                catch (error) {

                    console.error(
                        "Application Error:",
                        error
                    );


                    alert(
                        "Application failed:\n\n" +
                        error.message
                    );

                }

            }
        );

    }



    /* =========================================================
       STATUS PAGE
    ========================================================= */

    const statusContainer =
        document.getElementById(
            "statusContainer"
        );


    if (statusContainer) {

        const loggedInUser =
            requireUser();


        if (!loggedInUser) {
            return;
        }


        async function loadUserStatus() {

            try {

                const applications =
                    await apiRequest(
                        "/applications/user/" +
                        loggedInUser.id
                    );


                if (
                    !applications ||
                    applications.length === 0
                ) {

                    statusContainer.innerHTML = `

                        <div class="status-card">

                            <div class="status-icon">
                                📋
                            </div>

                            <h2>
                                No Application Found
                            </h2>

                            <p>
                                You have not submitted a bus pass application yet.
                            </p>

                        </div>

                    `;

                    return;
                }


                const userApplication =
                    applications[
                        applications.length - 1
                    ];


                const status =
                    normalizeStatus(
                        userApplication.status
                    );


                let statusClass =
                    "status-pending";


                if (
                    status === "Approved"
                ) {

                    statusClass =
                        "status-approved";

                }


                if (
                    status === "Rejected"
                ) {

                    statusClass =
                        "status-rejected";

                }


                const user =
                    userApplication.user || {};


                const busPass =
                    userApplication.busPass || {};


                statusContainer.innerHTML = `

                    <div class="status-card">

                        <div class="status-icon">
                            📋
                        </div>

                        <h2>
                            Application Details
                        </h2>

                        <p>
                            Your latest bus pass application.
                        </p>

                        <div class="status-details">

                            <div class="status-row">
                                <span>
                                    Passenger Name
                                </span>

                                <span>
                                    ${escapeHtml(
                                        user.name ||
                                        loggedInUser.name
                                    )}
                                </span>
                            </div>


                            <div class="status-row">
                                <span>
                                    Email
                                </span>

                                <span>
                                    ${escapeHtml(
                                        user.email ||
                                        loggedInUser.email
                                    )}
                                </span>
                            </div>


                            <div class="status-row">
                                <span>
                                    Phone
                                </span>

                                <span>
                                    ${escapeHtml(
                                        user.phone ||
                                        loggedInUser.phone
                                    )}
                                </span>
                            </div>


                            <div class="status-row">
                                <span>
                                    Bus Route
                                </span>

                                <span>
                                    ${escapeHtml(
                                        busPass.route
                                    )}
                                </span>
                            </div>


                            <div class="status-row">
                                <span>
                                    Pass Type
                                </span>

                                <span>
                                    ${escapeHtml(
                                        busPass.passType
                                    )}
                                </span>
                            </div>


                            <div class="status-row">
                                <span>
                                    Amount
                                </span>

                                <span>
                                    ₹${escapeHtml(
                                        busPass.amount
                                    )}
                                </span>
                            </div>


                            <div class="status-row">
                                <span>
                                    Status
                                </span>

                                <span>
                                    <span
                                        class="status-badge ${statusClass}"
                                    >
                                        ${status}
                                    </span>
                                </span>
                            </div>

                        </div>

                    </div>

                `;

            }

            catch (error) {

                console.error(error);


                statusContainer.innerHTML = `

                    <div class="status-card">

                        <div class="status-icon">
                            ⚠️
                        </div>

                        <h2>
                            Unable to Load Status
                        </h2>

                        <p>
                            ${escapeHtml(
                                error.message
                            )}
                        </p>

                    </div>

                `;

            }

        }


        loadUserStatus();

    }



    /* =========================================================
       ADMIN DASHBOARD
    ========================================================= */

    const applicationTableBody =
        document.getElementById(
            "applicationTableBody"
        );


    if (applicationTableBody) {

        async function loadAdminApplications() {

            try {

                const applications =
                    await apiRequest(
                        "/applications"
                    );


                const total =
                    applications.length;


                const pending =
                    applications.filter(
                        application =>
                            normalizeStatus(
                                application.status
                            ) === "Pending"
                    ).length;


                const approved =
                    applications.filter(
                        application =>
                            normalizeStatus(
                                application.status
                            ) === "Approved"
                    ).length;


                const rejected =
                    applications.filter(
                        application =>
                            normalizeStatus(
                                application.status
                            ) === "Rejected"
                    ).length;


                document.getElementById(
                    "totalApplications"
                ).textContent =
                    total;


                document.getElementById(
                    "pendingApplications"
                ).textContent =
                    pending;


                document.getElementById(
                    "approvedApplications"
                ).textContent =
                    approved;


                document.getElementById(
                    "rejectedApplications"
                ).textContent =
                    rejected;



                if (
                    applications.length === 0
                ) {

                    applicationTableBody.innerHTML = `

                        <tr>

                            <td colspan="8">
                                No applications found.
                            </td>

                        </tr>

                    `;

                    return;
                }


                applicationTableBody.innerHTML =
                    "";


                applications.forEach(
                    function (application) {

                        const status =
                            normalizeStatus(
                                application.status
                            );


                        let statusClass =
                            "pending";


                        if (
                            status === "Approved"
                        ) {
                            statusClass =
                                "approved";
                        }


                        if (
                            status === "Rejected"
                        ) {
                            statusClass =
                                "rejected";
                        }


                        const user =
                            application.user || {};


                        const busPass =
                            application.busPass || {};


                        let actionButtons =
                            "";


                        if (
                            status === "Pending"
                        ) {

                            actionButtons = `

                                <button
                                    class="action-btn approve-btn"
                                    onclick="updateApplicationStatus(
                                        ${application.id},
                                        'APPROVED'
                                    )"
                                >
                                    Approve
                                </button>


                                <button
                                    class="action-btn reject-btn"
                                    onclick="updateApplicationStatus(
                                        ${application.id},
                                        'REJECTED'
                                    )"
                                >
                                    Reject
                                </button>

                            `;

                        }

                        else {

                            actionButtons = `
                                <span>
                                    Completed
                                </span>
                            `;

                        }


                        const row =
                            document.createElement(
                                "tr"
                            );


                        row.innerHTML = `

                            <td>
                                ${escapeHtml(
                                    application.id
                                )}
                            </td>

                            <td>
                                ${escapeHtml(
                                    user.name
                                )}
                            </td>

                            <td>
                                ${escapeHtml(
                                    user.email
                                )}
                            </td>

                            <td>
                                ${escapeHtml(
                                    user.phone
                                )}
                            </td>

                            <td>
                                ${escapeHtml(
                                    busPass.route
                                )}
                            </td>

                            <td>
                                ${escapeHtml(
                                    busPass.passType
                                )}
                            </td>

                            <td>

                                <span
                                    class="admin-status ${statusClass}"
                                >
                                    ${status}
                                </span>

                            </td>

                            <td>
                                ${actionButtons}
                            </td>

                        `;


                        applicationTableBody.appendChild(
                            row
                        );

                    }
                );

            }

            catch (error) {

                console.error(error);


                applicationTableBody.innerHTML = `

                    <tr>

                        <td colspan="8">

                            Unable to load applications:

                            ${escapeHtml(
                                error.message
                            )}

                        </td>

                    </tr>

                `;

            }

        }



        window.updateApplicationStatus =
            async function (
                applicationId,
                newStatus
            ) {

                try {

                    await apiRequest(
                        "/applications/" +
                        applicationId +
                        "/status?status=" +
                        encodeURIComponent(
                            newStatus
                        ),
                        {
                            method: "PUT"
                        }
                    );


                    alert(
                        "Application " +
                        normalizeStatus(
                            newStatus
                        ).toLowerCase() +
                        " successfully!"
                    );


                    loadAdminApplications();

                }

                catch (error) {

                    alert(
                        "Failed to update application:\n\n" +
                        error.message
                    );

                }

            };


        loadAdminApplications();

    }



    /* =========================================================
       DIGITAL PASS
    ========================================================= */

    const digitalPassContainer =
        document.getElementById(
            "digitalPassContainer"
        );


    if (digitalPassContainer) {

        const loggedInUser =
            requireUser();


        if (!loggedInUser) {
            return;
        }


        async function loadDigitalPass() {

            try {

                const applications =
                    await apiRequest(
                        "/applications/user/" +
                        loggedInUser.id
                    );


                const approvedApplication =
                    applications
                        .filter(
                            application =>
                                normalizeStatus(
                                    application.status
                                ) === "Approved"
                        )
                        .pop();


                if (
                    !approvedApplication
                ) {

                    digitalPassContainer.innerHTML = `

                        <div class="digital-card">

                            <div class="digital-icon">
                                🎫
                            </div>

                            <h2>
                                Digital Pass Not Available
                            </h2>

                            <p>
                                Your bus pass must be approved
                                before the digital pass is generated.
                            </p>

                        </div>

                    `;

                    return;
                }


                const user =
                    approvedApplication.user || {};


                const busPass =
                    approvedApplication.busPass || {};


                const passId =
                    "BP-" +
                    approvedApplication.id;


                digitalPassContainer.innerHTML = `

                    <div class="digital-card">

                        <div class="digital-icon">
                            🎫
                        </div>

                        <h2>
                            Bus Pass Approved
                        </h2>

                        <p>
                            Your digital bus pass is active.
                        </p>

                        <div class="digital-pass-details">

                            <div class="digital-row">
                                <span>
                                    Passenger Name
                                </span>

                                <span>
                                    ${escapeHtml(
                                        user.name ||
                                        loggedInUser.name
                                    )}
                                </span>
                            </div>


                            <div class="digital-row">
                                <span>
                                    Email
                                </span>

                                <span>
                                    ${escapeHtml(
                                        user.email ||
                                        loggedInUser.email
                                    )}
                                </span>
                            </div>


                            <div class="digital-row">
                                <span>
                                    Phone
                                </span>

                                <span>
                                    ${escapeHtml(
                                        user.phone ||
                                        loggedInUser.phone
                                    )}
                                </span>
                            </div>


                            <div class="digital-row">
                                <span>
                                    Bus Route
                                </span>

                                <span>
                                    ${escapeHtml(
                                        busPass.route
                                    )}
                                </span>
                            </div>


                            <div class="digital-row">
                                <span>
                                    Pass Type
                                </span>

                                <span>
                                    ${escapeHtml(
                                        busPass.passType
                                    )}
                                </span>
                            </div>


                            <div class="digital-row">
                                <span>
                                    Amount
                                </span>

                                <span>
                                    ₹${escapeHtml(
                                        busPass.amount
                                    )}
                                </span>
                            </div>


                            <div class="digital-row">
                                <span>
                                    Status
                                </span>

                                <span>
                                    Approved
                                </span>
                            </div>

                        </div>


                        <div class="pass-id">

                            <span>
                                PASS ID
                            </span>

                            <strong>
                                ${escapeHtml(
                                    passId
                                )}
                            </strong>

                        </div>


                        <button
                            class="download-pass-btn"
                            onclick="window.print()"
                        >
                            🖨️ Download / Print Pass
                        </button>

                    </div>

                `;

            }

            catch (error) {

                console.error(error);


                digitalPassContainer.innerHTML = `

                    <div class="digital-card">

                        <div class="digital-icon">
                            ⚠️
                        </div>

                        <h2>
                            Unable to Load Digital Pass
                        </h2>

                        <p>
                            ${escapeHtml(
                                error.message
                            )}
                        </p>

                    </div>

                `;

            }

        }


        loadDigitalPass();

    }



    /* =========================================================
       USER LOGOUT
    ========================================================= */

    const userLogout =
        document.getElementById(
            "userLogout"
        );


    if (userLogout) {

        userLogout.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                localStorage.removeItem(
                    "loggedInUser"
                );


                alert(
                    "Logged out successfully!"
                );


                window.location.href =
                    "index.html";

            }
        );

    }



    /* =========================================================
       ADMIN LOGOUT
    ========================================================= */

    const adminLogoutLinks =
        document.querySelectorAll(
            'a[href="index.html"]'
        );


    adminLogoutLinks.forEach(
        function (link) {

            if (
                window.location.pathname
                    .endsWith(
                        "admin-dashboard.html"
                    )
            ) {

                link.addEventListener(
                    "click",
                    function () {

                        localStorage.removeItem(
                            "adminLoggedIn"
                        );

                    }
                );

            }

        }
    );



    /* =========================================================
       USER DASHBOARD SECURITY
    ========================================================= */

    if (
        window.location.pathname
            .endsWith(
                "dashboard.html"
            )
    ) {

        const loggedInUser =
            localStorage.getItem(
                "loggedInUser"
            );


        if (!loggedInUser) {

            window.location.href =
                "login.html";

            return;
        }

    }



    /* =========================================================
       USER PAGE SECURITY
    ========================================================= */

    const protectedUserPages = [

        "apply-pass.html",

        "status.html",

        "digitalpass.html"

    ];


    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    if (
        protectedUserPages.includes(
            currentPage
        )
    ) {

        const loggedInUser =
            localStorage.getItem(
                "loggedInUser"
            );


        if (!loggedInUser) {

            window.location.href =
                "login.html";

        }

    }

});
