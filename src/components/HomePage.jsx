import { Card, Button, Typography, Space } from 'antd';
import { PlayCircleOutlined, TrophyOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
            padding: '2rem'
        }}>
            <Card style={{
                maxWidth: 800,
                margin: '0 auto',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
                <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
                    <Title style={{
                        marginBottom: 0,
                        background: 'linear-gradient(45deg, #1890ff, #722ed1)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontFamily: "'Poppins', sans-serif"
                    }}>
                        Welcome to QuizMaster
                    </Title>

                    <Paragraph style={{
                        fontSize: '18px',
                        color: '#666',
                        maxWidth: '600px',
                        margin: '0 auto',
                        fontFamily: "'Roboto', sans-serif"
                    }}>
                        Test your knowledge, track your progress, and challenge yourself with our interactive quizzes!
                    </Paragraph>

                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <Card style={{
                            width: 300,
                            textAlign: 'center',
                            borderRadius: '12px',
                            transition: 'transform 0.2s',
                            cursor: 'pointer'
                        }}
                            hoverable
                            onClick={() => navigate('/quiz')}
                        >
                            <PlayCircleOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                            <Title level={4}>Start Quiz</Title>
                            <Paragraph>Begin your journey with our interactive quiz platform</Paragraph>
                        </Card>

                        <Card style={{
                            width: 300,
                            textAlign: 'center',
                            borderRadius: '12px',
                            transition: 'transform 0.2s',
                            cursor: 'pointer'
                        }}
                            hoverable
                            onClick={() => navigate('/history')}
                        >
                            <TrophyOutlined style={{ fontSize: '48px', color: '#722ed1' }} />
                            <Title level={4}>View History</Title>
                            <Paragraph>Check your past performance and track progress</Paragraph>
                        </Card>
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <Title level={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <QuestionCircleOutlined />
                            How it works
                        </Title>
                        <Space direction="vertical">
                            <Paragraph>• Each quiz has multiple questions with a 30-second timer per question</Paragraph>
                            <Paragraph>• Get instant feedback on your answers</Paragraph>
                            <Paragraph>• Track your progress with detailed history</Paragraph>
                            {/* <Paragraph>• Try multiple times to improve your score</Paragraph> */}
                        </Space>
                    </div>

                    <Button
                        type="primary"
                        size="large"
                        icon={<PlayCircleOutlined />}
                        onClick={() => navigate('/quiz')}
                        style={{
                            borderRadius: '8px',
                            height: '48px',
                            fontSize: '18px',
                            background: 'linear-gradient(45deg, #1890ff, #722ed1)',
                            border: 'none'
                        }}
                    >
                        Start Quiz Now
                    </Button>
                </Space>
            </Card>
        </div>
    );
};

export default HomePage;
