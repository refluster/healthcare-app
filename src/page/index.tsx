import React, { useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions, Drawer } from '@mui/material';
import Header from '../component/header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from "react-router-dom";
import PostButton from '../component/post-button';
import PostPage from './post';

const IndexPage: React.FC = () => {
    const [openPostUI, setOpenPostUI] = React.useState(false);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            console.log(user);
            if (!user) {
                navigate('/intro');
            }
        })();
    }, [user, navigate]);

    const data = [
        {
            title: "戦闘力を高める事故投資",
            description: "そらっちの銀行トランザクションの事例、事故資産の説明、など。",
        }, {
            title: "書籍がもつ知的好奇心の効果",
            description: "めちゃコミの書籍が与える知的な健康への影響。",
        }, {
            title: "過度な攻撃性の件",
            description: "発信内容の少しの気遣いから授かる中期的なポジティブインパクト。",
        }, {
            title: "衝動買いに対する意識",
            description: "衝動買いは即時の感情的満足を追求する行動であり、長期的な後悔や経済的不安を引き起こすことがあります。計画的な購入と比較し、心理的な不満を一時的に解消することが目的であることが研究で明らかにされています（Verplanken & Sato, 2011年）。",
        }, {
            title: "時間管理と優先順位付け",
            description: "効果的な時間管理は、生産性の向上、ストレスの軽減、そしてより満足のいく生活へと繋がります。目標設定理論に基づき、SMART（具体的、測定可能、達成可能、現実的、時間的に限定された）目標を設定することが推奨されています（Locke & Latham, 2002年）。",
        }, {
            title: "感謝の習慣",
            description: "感謝は幸福感を高める重要な要素であり、感謝日記をつけることなどにより、人々の幸福感、健康、睡眠の質が向上することが示されています（Emmons & McCullough, 2003年）。",
        }, {
            title: "ストレス管理",
            description: 'ストレス管理の技術、特に定期的な運動や瞑想は、ストレスホルモンのレベルを下げ、心理的なウェルビーイングを高めることが知られています（Pedersen & Saltin, 2015年；Goyal et al., 2014年）。',
        }, {
            title: '健康的な生活習慣',
            desctiption: '健康的な食事、運動、十分な睡眠は、全体的な幸福感と生産性に直接的な影響を与えます。これらは心身の健康を維持し、慢性疾患のリスクを低減します（Harris, 2009年；Chaput, 2014年）。'
        }
    ];

    const openPostScreen = () => {
        setOpenPostUI(true);
    }
    const togglePostScreen = (open: boolean) => () => {
        setOpenPostUI(open);
    }

    return (
        <Box sx={{ position: "relative" }}>
            <Drawer open={openPostUI} onClose={togglePostScreen(false)} sx={{
                width: '100vw', // 画面の幅全体にする
                '& .MuiDrawer-paper': {
                    width: '100vw', // ドロワーのPaperコンポーネントも画面幅全体にする
                    height: '100vh', // 画面の高さ全体にする
                },
            }}>
                <PostPage onCloseScreen={togglePostScreen(false)} />
            </Drawer>
            <Header title="Wellness" />
            <Box sx={{ pt: 15 }}>
                <Typography variant='h1' style={{ marginLeft: 16 }}>Home</Typography>
                <Card sx={{ my: 2 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <Box sx={{
                                backgroundColor: '#888',
                                backgroundImage: `url(${user?.photoURL || ''})`,
                                backgroundSize: 'contain',
                                width: 28, height: 28,
                                borderRadius: '50%',
                                mr: 2,
                            }} />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            今日は部下にキツく当たってしまった。この間の週末は衝動買いしたと思う。最近、資料に整理する時間が、以前より長くなっている気がする。
                        </Typography>
                    </CardContent>
                </Card>
                {
                    data.map(d => (<Card sx={{ my: 2 }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {d.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {d.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Try</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>))
                }
            </Box>
            <Button onClick={openPostScreen} >Post</Button>
            <PostButton style={{ position: 'fixed', right: 24, bottom: 24 }} />
        </Box>
    );
};

export default IndexPage;
