document.addEventListener('DOMContentLoaded', () => {
    const authLinks = document.getElementById('auth-links');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

    const updateAuthLinks = () => {
        if (currentUser) {
            authLinks.innerHTML = `
                <span>Welcome, ${currentUser.email}</span>
                <button id="logout-btn">Logout</button>
            `;
            document.getElementById('logout-btn').addEventListener('click', logout);
        } else {
            authLinks.innerHTML = `
                <button id="signin-btn">Sign In</button>
                <button id="signup-btn">Sign Up</button>
            `;
            document.getElementById('signin-btn').addEventListener('click', showSignInForm);
            document.getElementById('signup-btn').addEventListener('click', showSignUpForm);
        }
    };

    const showSignInForm = () => {
        const formHtml = `
            <div id="auth-modal" class="modal">
                <div class="modal-content">
                    <h4>Sign In</h4>
                    <form id="signin-form">
                        <div class="input-field">
                            <input type="email" id="signin-email" required />
                            <label for="signin-email">Email</label>
                        </div>
                        <div class="input-field">
                            <input type="password" id="signin-password" required />
                            <label for="signin-password">Password</label>
                        </div>
                        <button type="submit" class="btn">Sign In</button>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', formHtml);
        const modal = M.Modal.init(document.getElementById('auth-modal'));
        modal.open();
        document.getElementById('signin-form').addEventListener('submit', signIn);
    };

    const showSignUpForm = () => {
        const formHtml = `
            <div id="auth-modal" class="modal">
                <div class="modal-content">
                    <h4>Sign Up</h4>
                    <form id="signup-form">
                        <div class="input-field">
                            <input type="email" id="signup-email" required />
                            <label for="signup-email">Email</label>
                        </div>
                        <div class="input-field">
                            <input type="password" id="signup-password" required />
                            <label for="signup-password">Password</label>
                        </div>
                        <button type="submit" class="btn">Sign Up</button>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', formHtml);
        const modal = M.Modal.init(document.getElementById('auth-modal'));
        modal.open();
        document.getElementById('signup-form').addEventListener('submit', signUp);
    };

    const signIn = (e) => {
        e.preventDefault();
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            M.toast({ html: 'Sign in successful!' });
            document.getElementById('auth-modal').remove();
            updateAuthLinks();
        } else {
            M.toast({ html: 'Invalid credentials!' });
        }
    };

    const signUp = (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const existingUser = users.find(u => u.email === email);

        if (existingUser) {
            M.toast({ html: 'User already exists!' });
        } else {
            const newUser = { email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            currentUser = newUser;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            M.toast({ html: 'Sign up successful!' });
            document.getElementById('auth-modal').remove();
            updateAuthLinks();
        }
    };

    const logout = () => {
        currentUser = null;
        localStorage.removeItem('currentUser');
        M.toast({ html: 'Logged out!' });
        updateAuthLinks();
    };

    updateAuthLinks();
});
