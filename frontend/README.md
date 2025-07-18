1.  ### [npm i express jsonwebtoken bcrypt body-parser dotenv mongoose joi cors](https://chatgpt.com/share/686bb7bd-284c-8011-a8ce-46af75acb7bd)

2.  ### [User Schema Explanation](https://chatgpt.com/share/686bb85d-2ef0-8011-86ee-e9ae6b5efc3f)

3.  ### [Express Router Explanation](https://chatgpt.com/share/686bba90-1028-8011-9133-9fd2750d7c96)

4.  ### [Signup Validation Explanation with joi](https://chatgpt.com/share/686bfb45-0798-8011-8134-abad98b04e2c)

5.  ### [Using jsonwebtoken in Node](https://chatgpt.com/share/6872a362-c8e0-8011-b17f-66beb81e178b)

6. ### [Password Encryption and JWT](https://chatgpt.com/share/6874006e-ec10-8011-9537-cd1ba8a8b292)

7. ### [Why Use BrowserRouter in main.jsx](https://chatgpt.com/share/68774d61-e148-8011-85b3-e5da841c9ee3)

8. ### [React State Update Explanation](https://chatgpt.com/share/6878afc5-d378-8011-a2d7-9d89de1e1d8f)
```js
const [loginInfo, setLoginInfo] = useState({ name: "", email: "", password: "" });

const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
};

```

9. [Controlled Input Explanation](https://chatgpt.com/share/6878b035-b918-8011-8469-dc5cd4a0a041)
```js
value={signupInfo.name}
```

10. [Unnderstanding the API call for signup](https://chatgpt.com/share/6878ded5-9238-8011-9b1f-f0e5ddf557e9)
```js
try {
    const url = "http://localhost:8080/auth/signup";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(signupInfo)
    })
    const result = await response.json();
    console.log(result);
} catch (error) {
    handleError(error);
}
```

11. ### [Private Routing in React](https://chatgpt.com/share/687a7af0-4448-8011-aa85-9586e3c01c0f)

12. ### [Private Routing Authentiicatiion Flow](https://chatgpt.com/share/687a8516-bf94-8011-9e03-87ea3b363f0b)
```js
const RefreshHandler = ({ setIsAuthenticated }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
                navigate('/home', { replace: false });
            }
        }
    }, [location, navigate, setIsAuthenticated])

    return (
        null
    )
}

export default RefreshHandler
```