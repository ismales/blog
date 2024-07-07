import { ConfigProvider, Flex, Typography, Form, Input, Checkbox, Button, Divider, message } from "antd";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../redux/tokenSlice";

import styles from "./SignUp.module.scss";
import { useRegisterUserMutation } from "../../redux/userApi";

const { Title, Text } = Typography;

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [createAccount, { isLoading: isCreating }] = useRegisterUserMutation();

  const handleFinish = async ({ username, email, password }) => {
    const request = {
      user: {
        username,
        email,
        password,
      },
    };
    localStorage.removeItem("token");

    await createAccount(request)
      .unwrap()
      .then((data) => {
        message.success("Account created successfully!");
        navigate("/");
        dispatch(signIn(...data.user));
      })
      .catch((e) => {
        if (e.data.errors.username) {
          message.error(`Username ${username} already exists.`);
        }

        if (e.data.errors.email) {
          message.error(`Email ${email} already exists.`);
        }
      });
  };

  if (isCreating) return <div>Loading</div>;

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            itemMarginBottom: 15,
            verticalLabelPadding: 2,
          },
          Typography: {
            titleMarginBottom: 30,
          },
          Button: {
            contentFontSizeLG: 14,
          },
        },
      }}
    >
      <Flex vertical align='center' justify='center' className={styles["sign-up-container"]}>
        <Title level={4}>Create new account</Title>
        <Form form={form} layout='vertical' size='large' onFinish={handleFinish}>
          <Form.Item
            label='Username'
            name='username'
            rules={[
              { required: true, message: "Please input your username!" },
              { min: 3, max: 20, message: "Username must be between 3 and 20 characters" },
            ]}
          >
            <Input placeholder='Username' />
          </Form.Item>
          <Form.Item
            label='Email address'
            name='email'
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder='Email address' />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, max: 40, message: "Password must be between 6 and 40 characters" },
            ]}
          >
            <Input.Password placeholder='Password' />
          </Form.Item>
          <Form.Item
            label='Repeat password'
            name='confirmPassword'
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please repeat your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("The two passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder='Repeat password' />
          </Form.Item>
          <Divider />
          <Form.Item
            name='agreement'
            valuePropName='checked'
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
          >
            <Checkbox className={styles["agree-checkbox"]}>
              I agree to the processing of my personal information
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type='primary' block size='large' htmlType='submit'>
              Create
            </Button>
          </Form.Item>
        </Form>
        <Text type='secondary' style={{ fontSize: 12 }}>
          Already have an account?{" "}
          <Link to='/sign-in' style={{ fontSize: 12 }}>
            Sign In.
          </Link>
        </Text>
      </Flex>
    </ConfigProvider>
  );
}
