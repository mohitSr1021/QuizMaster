import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Modal, Typography, Button } from 'antd';
import { TrophyOutlined, StarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Celebration = ({ isVisible, onClose, score, totalQuestions }) => {
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    console.log("windowDimensions", windowDimensions)

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    console.log("showCelebration from Celebration component", isVisible)
    console.log("score from Celebration component", score)
    console.log("totalQuestions from Celebration component", totalQuestions)

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1000 }}>
            {isVisible && <Confetti
                width={windowDimensions.width}
                height={windowDimensions.height}
                recycle={false}
                numberOfPieces={1500}
            />}
            <Modal
                open={isVisible}
                footer={null}
                onCancel={onClose}
                width={400}
                centered
                className="celebration-modal"
                style={{ pointerEvents: 'auto' }}
            >
                <div style={{
                    textAlign: 'center',
                    padding: '20px 0'
                }}
                >
                    <div style={{
                        background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                        borderRadius: '50%',
                        width: '100px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px'
                    }}>
                        <TrophyOutlined style={{
                            fontSize: '48px',
                            color: '#fff'
                        }} />
                    </div>

                    <Title level={2} style={{
                        background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '16px'
                    }}>
                        Perfect Score!
                    </Title>

                    <Text style={{
                        fontSize: '18px',
                        display: 'block',
                        marginBottom: '24px'
                    }}>
                        Congratulations! You`ve achieved a perfect score of {score}/{totalQuestions}!
                    </Text>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px',
                        marginBottom: '16px'
                    }}>
                        {[...Array(5)].map((_, index) => (
                            <StarOutlined key={index} style={{
                                fontSize: '24px',
                                color: '#FFD700'
                            }} />
                        ))}
                    </div>

                    <Text style={{
                        display: 'block',
                        color: '#666',
                        marginBottom: '24px'
                    }}>
                        Youve mastered this quiz! Ready for another challenge?
                    </Text>

                    <Button
                        type="primary"
                        size="large"
                        onClick={onClose}
                        style={{
                            background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                            border: 'none',
                            height: '48px',
                            borderRadius: '24px',
                            fontSize: '16px',
                            width: '200px'
                        }}
                    >
                        Continue
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default Celebration;