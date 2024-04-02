import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { Journal } from '../model';
import { User } from 'firebase/auth';
import { formatRelative } from 'date-fns';
import { queryBooks } from '../api/google-book';

interface Props {
    journal: Journal;
    user: User;
}

type Content = {
    content: string;
    query: string[];
};

type BookInfo = {
    title: string;
    subtitle: string;
    infoLink: string;
    thumbnail: string;
};

const BookRecommendUI: React.FC<Props> = ({ journal }) => {
    const [bookInfo, setBookInfo] = React.useState([] as BookInfo[]);
    const d = journal;
    const content = d.content as Content;

    React.useEffect(() => {
        (async () => {
            const queryResult = await queryBooks({query: content.query, maxResults: 3});
            //const queryResult = QueryResult;
            const _bookInfo = queryResult.items.map(d => ({
                title: d.volumeInfo.title,
                subtitle: d.volumeInfo.subtitle,
                infoLink: d.volumeInfo.infoLink,
                thumbnail: d.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:'),
            } as BookInfo))
            setBookInfo(_bookInfo);
        })();
    }, []);

    return (
        <Box sx={{ mx: 2, py: 4, borderBottom: '1px solid #eee', display: 'flex' }}>
            <Typography gutterBottom variant="h6" component="div">
                <Box sx={{
                    backgroundColor: '#888',
                    width: 28, height: 28,
                    borderRadius: '50%',
                    mr: 1.5,
                }} />
            </Typography>
            <Box sx={{
                width: '100%',
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    mb: 1,
                }}>
                    <Box>{d.author}</Box>
                    <Box sx={{ fontSize: 12 }}>{formatRelative(d.createdAt, new Date())}</Box>
                </Box>
                <Box sx={{
                }}>
                    <Box sx={{ my: 2 }}>
                        {content.content}
                        <Box>{content.query.join(' ')}</Box>
                    </Box>
                    {bookInfo.map(book => (
                        <Link href={book.infoLink} sx={{
                            textDecoration: 'none',
                            display: 'flex',
                            gap: 2,
                            mb: 2
                        }}>
                            <Box sx={{
                                height: 120,
                                minWidth: 80,
                                backgroundSize: 'cover',
                                backgroundImage: `url(${book.thumbnail})`
                            }} />
                            <Box>
                                <Box sx={{ fontWeight: 500 }}>{book.title}</Box>
                                <Box>{book.subtitle}</Box>
                            </Box>
                        </Link>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default BookRecommendUI;

const QueryResult = {
    "kind": "books#volumes",
    "totalItems": 2604,
    "items": [
        {
            "kind": "books#volume",
            "id": "CIFaEAAAQBAJ",
            "etag": "QQaQCz1b8rU",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/CIFaEAAAQBAJ",
            "volumeInfo": {
                "title": "トラウマ転換ウォーキング（第三版）",
                "subtitle": "世界的に認められている心理療法ＥＭＤＲを自分で行いました！　トラウマを克服（転換）して、「ＰＴＧ（心的外傷後成長）」を目指せ！トラウマ克服に役立つ簡単な方法！",
                "authors": [
                    "菅原隆志"
                ],
                "publisher": "個人出版",
                "publishedDate": "2022-01-23",
                "description": "世界的に認められている心理療法ＥＭＤＲを組み込んだ健康的な方法が完成！ トラウマに苦しんだ著者が考案したオリジナル方法です。 ※医療機関を受診されている人は必ず医師の指示に従って下さい。 ※本書は専門書ではなく実用本です。 （本書に書いてある方法を繰り返し実践しない人には不向きです） ※本書は出版社を通していない個人出版本です。神経質な方はご遠慮下さい。 ※本書の第二章からはChatGPT4.0を活用して書いています。 ・トラウマとは 心的外傷（しんてきがいしょう）のことで、言い換えれば「深い心の傷」と言えます。衝撃的な体験、死の危険を感じる体験、精神的ショックなどが原因で抱えることがあり、それに長く囚われてしまう状態で、マイナスな影響を及ぼします。「深い心の傷」を言い換えると、「冷凍保存された記憶」とか「未処理未消化の過去の記憶」になります。そして、同じ出来事を経験しても、トラウマになる人とならない人がいます。 ・トラウマを克服するには つまり、トラウマにならない人たちのような思考回路を創りつつ、「未処理未消化の過去の記憶」を消化させていけば良いのです。勿論、安全な場所で、そして健康的な方法で。それが「トラウマ転換ウォーキング」です。そして最も大切なことは、トラウマを克服（転換）して、王道である「ＰＴＧ（心的外傷後成長）」を目指すこと！！ この本は、読んで終わりにしてほしくないので、すぐに実践出来るように、第１章では無駄な情報を省き、文字数を減らして制作した実践的な本となっております。 【こんな人には不向き】 ・責任転嫁する人 （自分の責任を他人になすり付ける人はトラウマ情報を転換出来ない） ・読んで終わりにして実際に行動に移さない人 （余計な情報を省いた実用本だから） ・自分を治してくれる魔法を探している人 （そういうものは無い） 【こんな人に向いている】 ・自分の心身の健康の為に動く人 ・自己責任も大切だと思える人 ・トラウマを終わらせたいと思う人 ・トラウマ転換ウォーキングのモニターさまの声 モニター募集して、トラウマ転換ウォーキングを試して頂きました！ ・大学院で心理学を修了している方 気持ちだけではなく体（特に表情）もすっきり（女性・３０代・ｌさま） ・前職まで、医療、福祉関係にて勤務されていた方 端的に結論を言うと、とても効果的であると思います（女性・３０代・Kさま） ・数多くのセラピーを受けたり、心理学などの本を読んでこられた方 他の方法では効果を感じなかった私でも気づきが起こり心と体が軽くなった（女性・４０代・ＲＴさま） ・機械メーカーの技術開発職で、「商品開発」「機械設計」を担当されている方 段々ポジティブな感情が芽生えてくるような感覚を自覚（男性・３０代・Ｕさま） ・大学では社会福祉を専攻し心理学も学んでいた方 トラウマ解消に特化していて根拠に基づいて作成されて信頼できる！（女性・２０代・Ｎさま） ・東証一部上場企業の総務で働いている方 一緒に取り組んだ彼女（現在の妻）も笑うように！（男性・２０代・Ｏさま） ・精神分野が専門の作業療法士、前野総太（実名）（２０代後半・男性） 精神分野が専門の作業療法士の私ですが、これぞまさしく「目から鱗が落ちる！」といった教材でした。 精神医学や心理学的な観点から、様々な手法が組み合わされており、かつオリジナルの手法です。 モニターをさせて頂きましたが、正直なところ逆に自分が勉強をさせて貰った次第です。 詳細はこちら https://sayonara-monster.com/post-1545/ https://sayonara-monster.com/post-1624/ ・はじめまして 著者の菅原と申します。 僕は過去、複雑なトラウマを抱えていました。得体の知れない不安や、強い恐怖が長い年月続き、スーパーに入ることも出来ない時期もありました。そのトラウマを大幅に減らすことが出来ました！ その方法が、「書くこと」を通して心の深い部分に変化を起こす、「サヨナラ・モンスター」という方法なのですが、「書くこと」と「併せて行っていた強力な方法（僕が個人的に強力と感じる方法）」が、、、この「トラウマ転換ウォーキング」です。 この方法は、トラウマを抱えていた時期に、人知れず行っていた方法です。苦しみから解放されたい……、しかし、極度の人間不信、自分の弱さを知られる恐怖などから、誰かに「助けて」と言えませんでした。そんな、１人で抱え込んでいた苦しみを、少しでも減らしたく、ほんの少しでもプラス効果を感じたことをやっていました。その方法の１つを、今、言語化して、「トラウマ転換ウォーキング」としてまとめました！ この方法に含まれている方法の一部は、世界的に認められている心理療法の原理も含まれています。当時、そんな心理療法も知らずにやっていたことが、後になって海外の文献を調べていくうちに、「これ俺がやっていたことだ！」とわかって繋がったのです。トラウマを減らしたい一心で僕自身が過去にやっていて、効果を感じていたことの一部が世界的に認められている心理療法の原理と同じ部分があったのです。ですので、ご安心頂ければと思います（素晴らしい方法が盛り込まれています）。 この「トラウマ転換ウォーキング」は僕自身が河川敷などで行っていた方法で、独自の方法です。必ずしも同じ方法でなければいけないわけではなく、お伝えする情報から、自分で自分に合ったやり方を工夫してやってみると良いと思います。お伝えする１つ１つは、どれも健全なもので、副作用とかがあるわけではないので（医療機関を受診されている人は必ず医師の指示に従って下さい）、自分なりに工夫して、自分がプラスを感じるやり方を繰り返すと良いと思います。誰でも簡単に行える方法で、歩くことと、歩く時に持っていけるスマホがあれば出来ます。また、トラウマがない人でも「プラス変化」を感じることが出来る方法です。日々、嫌な気持ちになりやすく、嫌な気持ちのループから抜け出したい人にもおすすめです。あとは、過去の嫌な記憶に縛られ、心が囚われている人にもおすすめです。この方法を行いながらウォーキングをすると、普通にウォーキングをするのと全然違って、かなりのプラス変化を感じることが出来ます。心だけではなく、身体の健康にも繋がります。ウォーキングは大腸がん予防（米国ユタ大学研究）など様々なプラス効果が期待出来ます。 ・トラウマを終わらせる 僕自身、ずっと悩んで、苦しんで、自分で出した答えが、「トラウマは転換しなければ終わらない」ということでした。あなたも、１つ１つ転換して、心の深い部分を変えていきましょう！（トラウマを終わらせよう！） ・トラウマは存在しない？ アドラー心理学ではトラウマは存在しないと、否定しています。僕は「トラウマは存在する」と思っています。「トラウマは存在するけど、自分次第で存在をなくすことが出来る」、このように考えています。トラウマ（心の傷）に関すること、、、ここを「転換」することは、時に、とても苦しいものです。だけど、もし転換が成功すれば、それは、「心的外傷後の成長（ＰＴＧ）」に繋がります。トラウマを抱えている人たちは、大きな成長を目の前にしていると言えます。 ​​​​​​​ ＝＝＝＝＝＝＝＝＝＝＝＝＝ 購入者の方は「公式サイト」で「ユーザー登録（無料）」が出来ます。ユーザー登録後は「会員限定記事（購入者限定）」を閲覧することが出来ます。トラウマを克服する為に役立つ記事を投稿しています。ぜひお読み下さい。",
                "readingModes": {
                    "text": false,
                    "image": true
                },
                "pageCount": 141,
                "printType": "BOOK",
                "categories": [
                    "Philosophy"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "1.4.4.0.preview.1",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=CIFaEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=CIFaEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "ja",
                "previewLink": "http://books.google.com/books?id=CIFaEAAAQBAJ&pg=PA119&dq=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&hl=&cd=1&source=gbs_api",
                "infoLink": "https://play.google.com/store/books/details?id=CIFaEAAAQBAJ&source=gbs_api",
                "canonicalVolumeLink": "https://play.google.com/store/books/details?id=CIFaEAAAQBAJ"
            },
            "saleInfo": {
                "country": "US",
                "saleability": "FOR_SALE",
                "isEbook": true,
                "listPrice": {
                    "amount": 19.36,
                    "currencyCode": "USD"
                },
                "retailPrice": {
                    "amount": 19.36,
                    "currencyCode": "USD"
                },
                "buyLink": "https://play.google.com/store/books/details?id=CIFaEAAAQBAJ&rdid=book-CIFaEAAAQBAJ&rdot=1&source=gbs_api",
                "offers": [
                    {
                        "finskyOfferType": 1,
                        "listPrice": {
                            "amountInMicros": 19360000,
                            "currencyCode": "USD"
                        },
                        "retailPrice": {
                            "amountInMicros": 19360000,
                            "currencyCode": "USD"
                        },
                        "giftable": true
                    }
                ]
            },
            "accessInfo": {
                "country": "US",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/%E3%83%88%E3%83%A9%E3%82%A6%E3%83%9E%E8%BB%A2%E6%8F%9B%E3%82%A6%E3%82%A9%E3%83%BC%E3%82%AD%E3%83%B3%E3%82%B0_%E7%AC%AC-sample-pdf.acsm?id=CIFaEAAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "webReaderLink": "http://play.google.com/books/reader?id=CIFaEAAAQBAJ&hl=&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "... <b>効果</b>を利用して緊張対策情動性の涙は、心身の緊張を<b>解消</b>する<b>効果</b>があります。以下にその 3 つの<b>効果</b>を挙げます。疲労感の軽減:涙を流すことで、身体や心の疲労感が軽減され、<b>リフレッシュ</b>される<b>効果</b>があります。速やかな<b>ストレス</b>緩和:涙により、<b>ストレス</b>&nbsp;..."
            }
        },
        {
            "kind": "books#volume",
            "id": "mcrDEAAAQBAJ",
            "etag": "xwXPq972qYs",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/mcrDEAAAQBAJ",
            "volumeInfo": {
                "title": "薬をすすめない薬剤師が教える 脱・薬健康法",
                "authors": [
                    "坂田武士"
                ],
                "publisher": "すばる舎",
                "publishedDate": "2023-06-08",
                "description": "日本人は、75歳以上の約４分の１が７種類以上、約５分の２が５種類以上の薬剤を多剤服用しています。 しかし、加齢にともなって一般成人とは異なる薬物有害事象が問題になってもいます。高齢者は薬の副作用が出やすいことや、薬の重複処方による有害事象に医療機関も患者さんも気がついていないことが多々あるのです。 本書では、「予防医学」の観点から、薬に頼らず、大病や寝たきりを遠ざけ、根本的に健康な身体をつくっていくための生活習慣・食習慣を提案しています。体質が改善されることによって、病気未満の「不定愁訴」を軽減し、多種類服用している薬を減らしていくことも期待できます。 100歳になった未来も健康でいるために、本書の内容をぜひ習慣化していってください。 【株式会社すばる舎】",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9784799111253"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "4799111256"
                    }
                ],
                "readingModes": {
                    "text": true,
                    "image": true
                },
                "pageCount": 148,
                "printType": "BOOK",
                "categories": [
                    "Health & Fitness"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "preview-1.0.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=mcrDEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=mcrDEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "ja",
                "previewLink": "http://books.google.com/books?id=mcrDEAAAQBAJ&pg=PA15-IA54&dq=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&hl=&cd=2&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=mcrDEAAAQBAJ&dq=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/%E8%96%AC%E3%82%92%E3%81%99%E3%81%99%E3%82%81%E3%81%AA%E3%81%84%E8%96%AC%E5%89%A4%E5%B8%AB%E3%81%8C%E6%95%99%E3%81%88.html?hl=&id=mcrDEAAAQBAJ"
            },
            "saleInfo": {
                "country": "US",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "US",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/%E8%96%AC%E3%82%92%E3%81%99%E3%81%99%E3%82%81%E3%81%AA%E3%81%84%E8%96%AC%E5%89%A4%E5%B8%AB%E3%81%8C%E6%95%99%E3%81%88-sample-epub.acsm?id=mcrDEAAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "pdf": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/%E8%96%AC%E3%82%92%E3%81%99%E3%81%99%E3%82%81%E3%81%AA%E3%81%84%E8%96%AC%E5%89%A4%E5%B8%AB%E3%81%8C%E6%95%99%E3%81%88-sample-pdf.acsm?id=mcrDEAAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "webReaderLink": "http://play.google.com/books/reader?id=mcrDEAAAQBAJ&hl=&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "... <b>散歩</b>には多くのメリットがありますが、歩き方や姿勢に気をつけることでより<b>効果</b>的に行うことができます。まず、ストレッチ等 ... <b>解消</b>され、骨粗鬆症や肥満、生活習慣病の予防や改善<b>効果</b>が期待できます。また全身運動ですので、血液の循環が良くなり冷え性や&nbsp;..."
            }
        },
        {
            "kind": "books#volume",
            "id": "t6Ut4w6JP6AC",
            "etag": "yiUw4bGz21M",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/t6Ut4w6JP6AC",
            "volumeInfo": {
                "title": "歳をとるほど脳力アップ!「ダッシュ脳」で頭が10倍冴える!",
                "subtitle": "",
                "authors": [
                    "森田勝之"
                ],
                "publisher": "マガジンハウス",
                "publishedDate": "2008-07",
                "description": "最初だけ勢いのあるビールのような人生よりも、歳を重ねるにつれてより芳醇で味わい深くなるヴィンテージワインのような人生。そんな人生の指針になる“ダッシュ脳”の鍛え方を紹介。",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_10",
                        "identifier": "4838718918"
                    },
                    {
                        "type": "ISBN_13",
                        "identifier": "9784838718917"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": true
                },
                "pageCount": 254,
                "printType": "BOOK",
                "categories": [
                    "Language Arts & Disciplines"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "0.4.4.0.preview.1",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=t6Ut4w6JP6AC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=t6Ut4w6JP6AC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "ja",
                "previewLink": "http://books.google.com/books?id=t6Ut4w6JP6AC&pg=PA165&dq=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&hl=&cd=3&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=t6Ut4w6JP6AC&dq=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/%E6%AD%B3%E3%82%92%E3%81%A8%E3%82%8B%E3%81%BB%E3%81%A9%E8%84%B3%E5%8A%9B%E3%82%A2%E3%83%83%E3%83%97_%E3%83%80%E3%83%83.html?hl=&id=t6Ut4w6JP6AC"
            },
            "saleInfo": {
                "country": "US",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "US",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/%E6%AD%B3%E3%82%92%E3%81%A8%E3%82%8B%E3%81%BB%E3%81%A9%E8%84%B3%E5%8A%9B%E3%82%A2%E3%83%83%E3%83%97_%E3%83%80%E3%83%83-sample-pdf.acsm?id=t6Ut4w6JP6AC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "webReaderLink": "http://play.google.com/books/reader?id=t6Ut4w6JP6AC&hl=&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "... <b>効果</b>的に脳を刺激し、リラックス&amp;<b>リフレッシュ</b>。ウォーキングでアイデアも豊かに☆香りで気分転換自分の好きな、そのときの気分と似た音楽を聴く。☆音楽で<b>ストレス解消</b>となくストレスを感じるときこそ、「リストアップ法」で問題を明らかに「状況を把握&nbsp;..."
            }
        },
        {
            "kind": "books#volume",
            "id": "dcVeCwAAQBAJ",
            "etag": "6YuuAQsdnQo",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/dcVeCwAAQBAJ",
            "volumeInfo": {
                "title": "AROMA教科書 アロマテラピー検定1級・2級 合格テキスト＆問題集 ＜公式テキスト2015年7月改訂版対応＞",
                "authors": [
                    "アロマテラピー検定対策研究会"
                ],
                "publisher": "翔泳社",
                "publishedDate": "2016-01-19",
                "description": "美しくて楽しくて、しかも1回で合格できる本！ 本書は、年2回（5月、11月）のアロマテラピー検定試験の1級と2級どちらにも、「1回でこの1冊だけで」合格できるよう、出るところを押さえた、効率的に学習できる学習書です。 本書の大きなポイントは、デザインにこだわった“美しい”資格書であること。 写真やイラストを豊富に使い、カラーページも多いため、飽きずに楽しくアロマの知識を学習することができます。 日本アロマ環境協会発行の最新公式テキスト（2015年7月改訂版）に完全対応！ ・カラーページが多く、写真やイラストも豊富なので、楽しみながら学習できる！ ・検定を知り尽くしたインストラクターやセラピストが出るところを伝授！もちろん一発合格！ ・節ごとに「ミニテスト」 → 章ごとに「練習問題（一問一答）」 → 総仕上げに「模擬問題4回分（1級・2級各2回）」とステップに応じた、豊富な問題が解ける！ ・巻末には重要キーワード集。直前対策に！ ・赤シート付き！",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9784798143538"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "4798143537"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": true
                },
                "pageCount": 274,
                "printType": "BOOK",
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "0.128.2.0.preview.1",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=dcVeCwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=dcVeCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "ja",
                "previewLink": "http://books.google.com/books?id=dcVeCwAAQBAJ&pg=PA262&dq=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&hl=&cd=4&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=dcVeCwAAQBAJ&dq=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/AROMA%E6%95%99%E7%A7%91%E6%9B%B8_%E3%82%A2%E3%83%AD%E3%83%9E%E3%83%86%E3%83%A9%E3%83%94%E3%83%BC%E6%A4%9C.html?hl=&id=dcVeCwAAQBAJ"
            },
            "saleInfo": {
                "country": "US",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "US",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/AROMA%E6%95%99%E7%A7%91%E6%9B%B8_%E3%82%A2%E3%83%AD%E3%83%9E%E3%83%86%E3%83%A9%E3%83%94%E3%83%BC%E6%A4%9C-sample-pdf.acsm?id=dcVeCwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "webReaderLink": "http://play.google.com/books/reader?id=dcVeCwAAQBAJ&hl=&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "... <b>効果</b>運動の種類有酸素運動(エアロビクス)無酸素運動(アネロビクス)・軽度から中 ... <b>リフレッシュ</b>・免疫機能強化・生活習慣病予防(高血圧症、脂質異常症、糖尿病)・肥満予防・改善・骨粗しょう症予防・体温調節機能向上・基礎代謝量上昇・自律神経機能改善・&nbsp;..."
            }
        },
        {
            "kind": "books#volume",
            "id": "36u5AAAAIAAJ",
            "etag": "Ht0ge9rtGVw",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/36u5AAAAIAAJ",
            "volumeInfo": {
                "title": "Nikkei torendi",
                "industryIdentifiers": [
                    {
                        "type": "OTHER",
                        "identifier": "UCSD:31822032731358"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": false
                },
                "pageCount": 688,
                "printType": "BOOK",
                "categories": [
                    "Consumers' preferences"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "0.4.4.0.preview.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=36u5AAAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=36u5AAAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                },
                "language": "ja",
                "previewLink": "http://books.google.com/books?id=36u5AAAAIAAJ&q=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&dq=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&hl=&cd=5&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=36u5AAAAIAAJ&dq=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Nikkei_torendi.html?hl=&id=36u5AAAAIAAJ"
            },
            "saleInfo": {
                "country": "US",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "US",
                "viewability": "NO_PAGES",
                "embeddable": false,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=36u5AAAAIAAJ&hl=&source=gbs_api",
                "accessViewStatus": "NONE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "... <b>解消</b>にも向く。ただ、高温浴は皮膚を乾燥させ、肌の老化を早めやすい。 41 度が境目高温浴温浴微温浴 39 ° c 42 ° c 42 ° C ~以上 39 ° C 入浴これがよい睡眠だ入浴の<b>効果</b>未满半身浴は心臓の負担が少ない全身浴半身浴部分浴□温度で<b>効果</b>が逆転高温浴癒し&nbsp;..."
            }
        },
        {
            "kind": "books#volume",
            "id": "hwvXCwAAQBAJ",
            "etag": "nGUG/gjzy4g",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/hwvXCwAAQBAJ",
            "volumeInfo": {
                "title": "【アプリ100万DL突破！】春のだるさ、五月病…ストレスがすっと消えてココロが軽くなる本",
                "authors": [
                    "COCOLOLO"
                ],
                "publisher": "ゴマブックス株式会社",
                "publishedDate": "2016-03-31",
                "description": "【大人気スマホアプリ「ココロ炉」100万DL突破！】 本来なら、生命エネルギーが活性化され、活発に動き回るシーズンに、心身の不調を訴える人が急増しています。 春の季節は「三寒四温」と言って、寒暖の差がある時期。暖かい日が続いたと思ったら、いきなり寒くなったり……。 気温と気圧の変化に合わせて、交感神経と副交感神経がバランスを崩してしまい、想像以上にわたしたちのカラダに負担をかけています。 また、多くの人々が「花粉」に悩まされる季節でもあります。 じつは「花粉症」も自律神経の乱れに大きく関与しています。 そんな春には、自律神経の乱れを起こす要素がたくさんあるのです。 また、環境の変化が多いのも、この時期。 入学、入社、転勤、引越しなど、これまでの環境が激変して、知らず知らずのうちにストレスがいっぱい。 古来よりいわれる「五月病」は、環境が変化して緊張状態が続き、 少し慣れたところで気が緩み、メンタル不全を起こす症状のこと。 「もっと頑張らなくちゃ」「わたしがしっかりしなきゃ」 そんな頑張り屋さんこそが、春の時期に、「イライラ、グッタリ、ウツウツ」に悩まされます。 そんな方々に、このムックをぜひ活用していただきたいと思います。 ギリギリまで無理をして悲鳴をあげているあなたに、30秒でストレスチェックをして、 ココロもカラダも元気にするアプリ「COCOLOLO」を活用しながらしっかりサポートする内容が満載です。 見るだけでリラックスできちゃう癒しの特典映像 全員プレゼント付き！ 【目次】 プロローグ スペシャル対談 板生研一＆小野なぎさ 「スマホアプリ」と「森林」が結びついた 楽しくて癒されるコンテンツを目指して あなたは大丈夫！？ 春のストレスまみれ 完全レスキュー 連載マンガ ストレスに負けるな！ ココandロロ 春の不調の原因は自律神経の乱れにあり！ あなたはどのタイプ？ 自律神経傾向チェック 連載 vol.1 わたしのリラックス法 呼吸アドバイザー 椎名由紀 音楽で自律神経を整える わずか３０秒で疲労やストレスがみるみる消えるアプリ COCOLOLOのすごい効果と使い方 APPLI NEWS エピローグ 「癒しの特典映像」全員プレゼント",
                "readingModes": {
                    "text": true,
                    "image": true
                },
                "pageCount": 67,
                "printType": "BOOK",
                "categories": [
                    "Health & Fitness"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "1.3.3.0.preview.3",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=hwvXCwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=hwvXCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "ja",
                "previewLink": "http://books.google.com/books?id=hwvXCwAAQBAJ&pg=PT20&dq=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&hl=&cd=6&source=gbs_api",
                "infoLink": "https://play.google.com/store/books/details?id=hwvXCwAAQBAJ&source=gbs_api",
                "canonicalVolumeLink": "https://play.google.com/store/books/details?id=hwvXCwAAQBAJ"
            },
            "saleInfo": {
                "country": "US",
                "saleability": "FOR_SALE",
                "isEbook": true,
                "listPrice": {
                    "amount": 9.79,
                    "currencyCode": "USD"
                },
                "retailPrice": {
                    "amount": 9.79,
                    "currencyCode": "USD"
                },
                "buyLink": "https://play.google.com/store/books/details?id=hwvXCwAAQBAJ&rdid=book-hwvXCwAAQBAJ&rdot=1&source=gbs_api",
                "offers": [
                    {
                        "finskyOfferType": 1,
                        "listPrice": {
                            "amountInMicros": 9790000,
                            "currencyCode": "USD"
                        },
                        "retailPrice": {
                            "amountInMicros": 9790000,
                            "currencyCode": "USD"
                        },
                        "giftable": true
                    }
                ]
            },
            "accessInfo": {
                "country": "US",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/%E3%82%A2%E3%83%97%E3%83%AA100%E4%B8%87DL%E7%AA%81%E7%A0%B4_%E6%98%A5%E3%81%AE%E3%81%A0%E3%82%8B%E3%81%95-sample-epub.acsm?id=hwvXCwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "pdf": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/%E3%82%A2%E3%83%97%E3%83%AA100%E4%B8%87DL%E7%AA%81%E7%A0%B4_%E6%98%A5%E3%81%AE%E3%81%A0%E3%82%8B%E3%81%95-sample-pdf.acsm?id=hwvXCwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "webReaderLink": "http://play.google.com/books/reader?id=hwvXCwAAQBAJ&hl=&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "... <b>リフレッシュ</b>頭の筋肉を使いすぎるとコリができて筋肉が硬くなり、それがストレスにつながってしまいます。<b>効果</b> ... <b>健康</b>な状態を取り戻しましょう。○ウォーキングで<b>ストレス解消</b>コンディションアップにはストレス軽減が必須 ... ストレス発散!イライラした時."
            }
        },
        {
            "kind": "books#volume",
            "id": "izoSAQAAMAAJ",
            "etag": "RpbRJY5vaGU",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/izoSAQAAMAAJ",
            "volumeInfo": {
                "title": "週刊ダイヤモンド",
                "publishedDate": "2000",
                "industryIdentifiers": [
                    {
                        "type": "OTHER",
                        "identifier": "UOM:39015043670705"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": false
                },
                "pageCount": 1226,
                "printType": "BOOK",
                "categories": [
                    "Industrial management"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "0.4.5.0.preview.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=izoSAQAAMAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=izoSAQAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                },
                "language": "ja",
                "previewLink": "http://books.google.com/books?id=izoSAQAAMAAJ&q=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&dq=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&hl=&cd=7&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=izoSAQAAMAAJ&dq=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/%E9%80%B1%E5%88%8A%E3%83%80%E3%82%A4%E3%83%A4%E3%83%A2%E3%83%B3%E3%83%89.html?hl=&id=izoSAQAAMAAJ"
            },
            "saleInfo": {
                "country": "US",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "US",
                "viewability": "NO_PAGES",
                "embeddable": false,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=izoSAQAAMAAJ&hl=&source=gbs_api",
                "accessViewStatus": "NONE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "... <b>効果</b>を招く。歩く時の姿勢を鏡に写したり、ビデオに撮って見ると、上述のよい姿勢 ... <b>健康</b>」、「ライフスタイルと<b>健康</b>」、「スポーツと<b>健康</b>」、「<b>健康</b>と食」を順に掲載しています。 ウォーキングで得られる身体的<b>効果</b>は、心肺機能・筋肉と骨の力・体力の向上、&nbsp;..."
            }
        },
        {
            "kind": "books#volume",
            "id": "P4obAQAAMAAJ",
            "etag": "2QLttKtGeHo",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/P4obAQAAMAAJ",
            "volumeInfo": {
                "title": "日本経済新聞縮刷版",
                "publishedDate": "2008",
                "industryIdentifiers": [
                    {
                        "type": "OTHER",
                        "identifier": "UOM:39015070842433"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": false
                },
                "pageCount": 1888,
                "printType": "BOOK",
                "categories": [
                    "Economic history"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "0.9.10.0.preview.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=P4obAQAAMAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=P4obAQAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                },
                "language": "ja",
                "previewLink": "http://books.google.com/books?id=P4obAQAAMAAJ&q=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&dq=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&hl=&cd=8&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=P4obAQAAMAAJ&dq=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/%E6%97%A5%E6%9C%AC%E7%B5%8C%E6%B8%88%E6%96%B0%E8%81%9E%E7%B8%AE%E5%88%B7%E7%89%88.html?hl=&id=P4obAQAAMAAJ"
            },
            "saleInfo": {
                "country": "US",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "US",
                "viewability": "NO_PAGES",
                "embeddable": false,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=P4obAQAAMAAJ&hl=&source=gbs_api",
                "accessViewStatus": "NONE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "... <b>リフレッシュ</b>に耳を傾けられるようにな最近の<b>健康</b>づくりのキーワードのひとつが ... <b>ストレス</b>を解風呂などで体を温めるのも血管この<b>健康</b>にいいりました。フルートを ... <b>効果</b>的であることが米国の研究で分かった。これを DASH 食(高血圧予防のための食事)と&nbsp;..."
            }
        },
        {
            "kind": "books#volume",
            "id": "P5FUDwAAQBAJ",
            "etag": "9yWQXosD3S0",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/P5FUDwAAQBAJ",
            "volumeInfo": {
                "title": "るるぶ信州’19",
                "publisher": "JTBパブリッシング",
                "publishedDate": "2018-03-09",
                "description": "【憧れの高原リゾートステイを自在にアレンジできる一冊】 首都圏から気軽に行ける高原リゾートとして人気の信州エリア。近年話題の絶景スポットや必ず食べたい信州グルメは巻頭特集でしっかり紹介。軽井沢、善光寺、松本などの定番エリアから、星空の美しさで注目を集める阿智村などの最旬エリアまで、広い信州の魅力的なエリアを完全網羅。上手に旅するためのプランニング情報も充実。旅先で利用するのに便利な「人気タウン街歩きMAP」、「高原おさんぽBOOK」、「信州ドライブコース」、「信州ドライブMAP&道の駅・SA・PAガイド」の4大付録付き。信州の魅力がたっぷり詰まった情報満載の一冊です。 【本誌掲載の主な特集】 ●絶景で旅する信州 眺望抜群のカフェや一面が真っ白に包まれる雲海など一度は見ておきたい絶景を大特集。 ・絶景カフェ ・ハイランド絶景 ・水辺の絶景 ・カラフルな花絶景 ・雲海絶景 ●信州グルメ 高原野菜、ご当地グルメ、ワイン、スイーツなど、信州の多彩な食の魅力を徹底紹介。 ・高原野菜 ・信州そば ・ご当地グルメ ・ワイン ・スイーツ 【主な掲載エリア】 軽井沢、上田、別所温泉、小諸、戸隠、小布施、松代、野沢温泉、志賀高原、飯山、竜王、湯田中渋温泉郷、清里、小渕沢、蓼科、ビーナスライン、安曇野、白馬、信濃大町、松本、上高地、乗鞍、木曽、伊那、高遠、阿智村、昼神温泉、善光寺、八ヶ岳、諏訪 etc. 【特別4大付録】 ・付録（1）人気タウン街歩きMAP 表は軽井沢、善光寺門前、小布施、松本の人気4タウンの街歩きに便利な地図。 裏はプランニングに役立つ信州全図 ・付録（2）高原おさんぽBOOK 上高地、乗鞍、千畳敷カールなど、高原リゾート・信州で人気のハイキングコースを収録。 ・付録（3）信州ドライブコース 魅力的なドライブコースが多い信州エリア。1泊2日のドライブコースと人気タウンからの日帰り ドライブコースを紹介 ・付録（4）信州ドライブMAP&道の駅・SA・PAガイド ドライブアドバイス付きの詳細地図と道の駅・SA・PA情報を収録。 ※この電子書籍は2018年3月にJTBパブリッシングから発行された図書を画像化したものです。電子書籍化にあたり、一部内容を変更している場合があります",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9784533125959"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "4533125956"
                    }
                ],
                "readingModes": {
                    "text": true,
                    "image": true
                },
                "pageCount": 217,
                "printType": "BOOK",
                "categories": [
                    "Travel"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": true,
                "contentVersion": "1.2.2.0.preview.3",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=P5FUDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=P5FUDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "ja",
                "previewLink": "http://books.google.com/books?id=P5FUDwAAQBAJ&pg=PA78&dq=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&hl=&cd=9&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=P5FUDwAAQBAJ&dq=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/%E3%82%8B%E3%82%8B%E3%81%B6%E4%BF%A1%E5%B7%9E_19.html?hl=&id=P5FUDwAAQBAJ"
            },
            "saleInfo": {
                "country": "US",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "US",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/%E3%82%8B%E3%82%8B%E3%81%B6%E4%BF%A1%E5%B7%9E_19-sample-epub.acsm?id=P5FUDwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "pdf": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/%E3%82%8B%E3%82%8B%E3%81%B6%E4%BF%A1%E5%B7%9E_19-sample-pdf.acsm?id=P5FUDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "webReaderLink": "http://play.google.com/books/reader?id=P5FUDwAAQBAJ&hl=&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "... 運動のできる服装・靴(レンタルあり、有料)、タオル、着替え参加条件なしあぐらを ... <b>リフレッシュ</b>しよう。いいやま自然を生かしたアクティビティが盛ん E 駅の開業 ... <b>ストレス解消</b>、免疫力アップなど、科学的に実証された「森林浴」の<b>効果</b>を生かした&nbsp;..."
            }
        },
        {
            "kind": "books#volume",
            "id": "dx_9DwAAQBAJ",
            "etag": "2PQA16E2eZE",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/dx_9DwAAQBAJ",
            "volumeInfo": {
                "title": "図解よくわかる 過敏性腸症候群で悩まない本",
                "publisher": "日東書院本社",
                "publishedDate": "2020-06",
                "description": "過敏性腸症候群とはなにか?その対応方法を紹介します。便意に悩まされない生活を! 【主な内容】 第1章: IBS(過敏性腸症候群)ってどんな病気? 第2章:検査・診断・治療 第3章: IBSの薬物療法 第4章:生活習慣や食事のコツ 第5章: IBSと向き合う心がまえ",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9784528022850"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "4528022850"
                    }
                ],
                "readingModes": {
                    "text": true,
                    "image": true
                },
                "pageCount": 162,
                "printType": "BOOK",
                "categories": [
                    "Medical"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "0.2.3.0.preview.3",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=dx_9DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=dx_9DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "ja",
                "previewLink": "http://books.google.com/books?id=dx_9DwAAQBAJ&pg=PA131&dq=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&hl=&cd=10&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=dx_9DwAAQBAJ&dq=%E6%95%A3%E6%AD%A9+%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5+%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E8%A7%A3%E6%B6%88+%E5%81%A5%E5%BA%B7%E5%8A%B9%E6%9E%9C&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/%E5%9B%B3%E8%A7%A3%E3%82%88%E3%81%8F%E3%82%8F%E3%81%8B%E3%82%8B_%E9%81%8E%E6%95%8F%E6%80%A7%E8%85%B8%E7%97%87%E5%80%99.html?hl=&id=dx_9DwAAQBAJ"
            },
            "saleInfo": {
                "country": "US",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "US",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/%E5%9B%B3%E8%A7%A3%E3%82%88%E3%81%8F%E3%82%8F%E3%81%8B%E3%82%8B_%E9%81%8E%E6%95%8F%E6%80%A7%E8%85%B8%E7%97%87%E5%80%99-sample-epub.acsm?id=dx_9DwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "pdf": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/%E5%9B%B3%E8%A7%A3%E3%82%88%E3%81%8F%E3%82%8F%E3%81%8B%E3%82%8B_%E9%81%8E%E6%95%8F%E6%80%A7%E8%85%B8%E7%97%87%E5%80%99-sample-pdf.acsm?id=dx_9DwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "webReaderLink": "http://play.google.com/books/reader?id=dx_9DwAAQBAJ&hl=&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "<b>散歩</b>だけでも心身の<b>リフレッシュ効果</b>が期待できる第 4 章生活習慣や食事のコツです。運動とはいっても、頑張ってやる必要は ... <b>ストレス</b>を<b>解消</b>するためのものです。突然の腹痛や下痢が心配な患者さんは、症状が出たら、すぐに家に帰れるぐらいの距離の<b>散歩</b>&nbsp;..."
            }
        }
    ]
};