import { FC } from "react";

type Props = {
  title: string;
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed%3Awght%40400%3B700&#038;display=swap&#038;ver=v1.0.0');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');
html,
body {
  margin: 0;
  padding: 0;
  background: black;
  color: #FFF;
}
.wrapper {
  width: 1200px;
  height: 630px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 60px;
  box-sizing: border-box;
}
.site-title {
  font-size: 30px;
  font-weight: 900;
  font-family: 'Roboto Condensed';
}
.title {
  font-size: 60px;
  font-feature-settings: "palt";
  font-weight: bold;
  font-family: 'Noto Sans JP';
}
.author {
  font-size: 60px;
  font-weight: 900;
  font-family: 'Roboto Condensed';
}
`;

const OgTemplate: FC<Props> = ({ title }) => {
  return (
    <html>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <body>
        <div className="wrapper">
          <div className="site-title">KATSUSHI-OUGI.COM</div>
          <div className="title">{title}</div>
          <div className="author">@anton072</div>
        </div>
      </body>
    </html>
  );
};

export default OgTemplate;
