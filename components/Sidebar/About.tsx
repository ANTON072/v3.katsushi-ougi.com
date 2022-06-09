import Script from "next/script";
import { FC } from "react";

const About: FC = () => {
  return (
    <div className="mb-[var(--padding)]">
      <p className="leading-[2]">
        日々の業務を通して学んだ記録を書いています。おもにJavaScriptやTypeScriptなどフロントエンド系が中心の内容です。
      </p>
      <p className="my-[1em]">
        <iframe
          id="twitter-widget-0"
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          className="twitter-follow-button twitter-follow-button-rendered"
          style={{
            position: "static",
            visibility: "visible",
            width: "124px",
            height: "28px",
          }}
          title="Twitter Follow Button"
          src="https://platform.twitter.com/widgets/follow_button.d7fc2fc075c61f6fa34d79a0cbbf1e34.ja.html#dnt=false&amp;id=twitter-widget-0&amp;lang=ja&amp;screen_name=anton072&amp;show_count=false&amp;show_screen_name=false&amp;size=l&amp;time=1654490578642"
          data-screen-name="anton072"
        ></iframe>
        <Script src="https://platform.twitter.com/widgets.js" />
      </p>
    </div>
  );
};

export default About;
