import { useState, useEffect } from "react"
import { Card, Typography, Table, Empty, Statistic, Row, Col, Button, Modal } from "antd"
import { HistoryOutlined, RiseOutlined, TrophyOutlined, ClockCircleOutlined, DeleteOutlined } from "@ant-design/icons"
import { getQuizAttempts, clearQuizAttempts } from "../services/indexedDB"

const { Title } = Typography

const QuizHistory = () => {
    const [attempts, setAttempts] = useState([])
    const [stats, setStats] = useState({
        totalAttempts: 0,
        averageScore: 0,
        bestScore: 0,
        recentScore: 0,
    })
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        loadAttempts()
    }, [])

    const loadAttempts = async () => {
        try {
            const savedAttempts = await getQuizAttempts()
            setAttempts(savedAttempts)

            if (savedAttempts.length > 0) {
                const scores = savedAttempts.map((a) => (a.score / a.totalQuestions) * 100)
                setStats({
                    totalAttempts: savedAttempts.length,
                    averageScore: (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1),
                    bestScore: Math.max(...scores).toFixed(1),
                    recentScore: scores[0].toFixed(1),
                })
            } else {
                setStats({
                    totalAttempts: 0,
                    averageScore: 0,
                    bestScore: 0,
                    recentScore: 0,
                })
            }
        } catch (error) {
            console.error("Error loading attempts:", error)
        }
    }

    const handleClearHistory = async () => {
        try {
            await clearQuizAttempts()
            setIsModalVisible(false)
            loadAttempts()
        } catch (error) {
            console.error("Error clearing history:", error)
        }
    }

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (text) =>
                new Date(text).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
        },
        {
            title: "Score",
            dataIndex: "score",
            key: "score",
            render: (score, record) => `${score}/${record.totalQuestions}`,
        },
        {
            title: "Percentage",
            dataIndex: "score",
            key: "percentage",
            render: (score, record) => `${((score / record.totalQuestions) * 100).toFixed(1)}%`,
        },
    ]

    return (
        <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-200 min-h-screen">
            <Card className="max-w-4xl !mx-auto shadow-xl rounded-lg border border-gray-300">
                <div className="flex justify-between items-center mb-8">
                    <Title level={2} className="flex items-center gap-2 m-0">
                        <HistoryOutlined className="text-blue-500" />
                        Quiz History
                    </Title>
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => setIsModalVisible(true)}
                        disabled={attempts.length === 0}
                    >
                        Clear History
                    </Button>
                </div>

                <Row gutter={16} className="mb-8 text-center">
                    <Col xs={24} sm={12} md={6}>
                        <Card variant="elevated" className="shadow-md hover:shadow-xl transition-all">
                            <Statistic
                                title="Total Attempts"
                                value={stats.totalAttempts}
                                prefix={<ClockCircleOutlined className="text-gray-400" />}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card variant="elevated" className="shadow-md hover:shadow-xl transition-all">
                            <Statistic
                                title="Average Score"
                                value={stats.averageScore}
                                suffix="%"
                                prefix={<RiseOutlined className="text-blue-500" />}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card variant="elevated" className="shadow-md hover:shadow-xl transition-all">
                            <Statistic
                                title="Best Score"
                                value={stats.bestScore}
                                suffix="%"
                                prefix={<TrophyOutlined className="text-yellow-500" />}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card variant="elevated" className="shadow-md hover:shadow-xl transition-all">
                            <Statistic
                                title="Recent Score"
                                value={stats.recentScore}
                                suffix="%"
                                prefix={<RiseOutlined className="text-green-500" />}
                            />
                        </Card>
                    </Col>
                </Row>

                {attempts.length > 0 ? (
                    <Table
                        dataSource={attempts}
                        columns={columns}
                        rowKey="timestamp"
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: false,
                        }}
                        className="w-full"
                    />
                ) : (
                    <Empty
                        description="No attempts yet. Take a quiz to see your history!"
                        className="my-8"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                )}
            </Card>

            <Modal
                title="Clear Quiz History"
                open={isModalVisible}
                onOk={handleClearHistory}
                onCancel={() => setIsModalVisible(false)}
                okText="Yes, clear history"
                cancelText="Cancel"
            >
                <p>Are you sure you want to clear all quiz history? This action cannot be undone.</p>
            </Modal>
        </div>
    )
}

export default QuizHistory

