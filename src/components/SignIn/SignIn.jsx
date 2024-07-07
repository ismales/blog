import { useDispatch } from "react-redux";
import { ConfigProvider, Flex, Typography, Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignIn.module.scss";
import { useSignInMutation } from "../../redux/userApi"; // добавлено
import { signIn } from "../../redux/tokenSlice";

const { Title, Text } = Typography;

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [logInAccount, { isLoading }] = useSignInMutation();

  const handleFinish = async ({ email, password }) => {
    const request = {
      user: {
        email,
        password,
      },
    };

    await logInAccount(request)
      .unwrap()
      .then(async (data) => {
        message.success("Sign in!");
        dispatch(signIn(data.user.token));

        navigate("/");
      })
      .catch(() => message.error("Email or password is invalid"));
  };

  if (isLoading) return <div>Loading</div>;

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
      <Flex vertical align='center' justify='center' className={styles["sign-in-container"]}>
        <Title level={4}>Sign In</Title>
        <Form form={form} layout='vertical' size='large' style={{ width: "100%" }} onFinish={handleFinish}>
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
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder='Password' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' block size='large' htmlType='submit'>
              Login
            </Button>
          </Form.Item>
        </Form>
        <Text type='secondary' style={{ fontSize: 12 }}>
          Don’t have an account?{" "}
          <Link to='/sign-up' style={{ fontSize: 12 }}>
            Sign Up.
          </Link>
        </Text>
      </Flex>
    </ConfigProvider>
  );
}
