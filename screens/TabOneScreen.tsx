import React from "react";
import { StyleSheet, Dimensions, FlatList } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import VideoPlayer from "../components/VideoPlayer";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [status, setStatus] = React.useState({});
  const [current, setCurrent] = React.useState(0);
  const [orientation, setOrientation] = React.useState<"potrait" | "landscape">(
    "potrait"
  );
  const video = React.useRef(null);
  const viewConfig = React.useRef({
    waitForInteraction: true,
    itemVisiblePercentThreshold: 90,
  });
  const itemChange = React.useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrent(viewableItems[0].index);
    }
  });
  // const videoRef = (component: any) => {
  //   const playbackObject = component;
  //   console.log(playbackObject, "---playback");
  // };

  const data = [
    {
      url: "https://rr2---sn-vgqsrnl6.googlevideo.com/videoplayback?expire=1654363743&ei=_kGbYtn5OIqJ2LYP6-OZoAg&ip=3.237.39.191&id=o-AMBFEroPHmAejcQ22U5OuJJgmvIypvL0eje6vzpoSaw2&itag=18&source=youtube&requiressl=yes&spc=4ocVC1kCmxtaAGxCOGKA751FQCCKf_k&vprv=1&mime=video%2Fmp4&ns=ocwgE97xApxtTHD1ttTAi18G&gir=yes&clen=4155984&ratebypass=yes&dur=66.687&lmt=1654327492884118&fexp=24001373,24007246&c=WEB&txp=6319224&n=R8ncGqukOe5Hi5gidm&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIgZyvpZP1x3540K21Ce13t2OOx3vWUVIsIoDBoNJhy6iMCIQDI0LuAoalqP9OT6aGtJCGkNm71ojpKIiOLrUj8Kh98vg%3D%3D&redirect_counter=1&cm2rm=sn-p5qe7y76&req_id=1cd5b58aff7fa3ee&cms_redirect=yes&cmsv=e&mh=5A&mip=118.137.179.189&mm=34&mn=sn-vgqsrnl6&ms=ltu&mt=1654341913&mv=D&mvi=2&pl=0&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgSUwWs0hUNDx-GeOia5G_hhbgHOn2KWAuv61JUs8OuFYCIGy0CSOXtsq2l2k9SN7xKskaowLNpwGiuAdwL7_FO5wC",
    },
    {
      url: "https://rr5---sn-vgqsrnsr.googlevideo.com/videoplayback?expire=1654365945&ei=mUqbYp3zGMX18gSyt4gY&ip=3.234.221.229&id=o-AEwplPZemdlqcF5e1x6Gr4UnU1obkXURToQRMKEcJ6yv&itag=18&source=youtube&requiressl=yes&spc=4ocVCysP_008946X6BSXLkmVjn4B-xU&vprv=1&mime=video%2Fmp4&ns=zfjqHoBmgtf1v0GQI81UeYcG&gir=yes&clen=3619284&ratebypass=yes&dur=64.435&lmt=1654278183307611&fexp=24001373,24007246&c=WEB&txp=6319224&n=ZgD3PBgxJeJptaE_Ts&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAIWD3-8J87iASZYqs7Dn83G2Dk8WY_IuLilB_wVkria7AiEApPFQlqzQ7HGrYypzptey8tStaNfVYSFSdbSfNWcYt6s%3D&redirect_counter=1&cm2rm=sn-p5qee77s&req_id=3b1964d6018aa3ee&cms_redirect=yes&cmsv=e&mh=QH&mip=118.137.179.189&mm=34&mn=sn-vgqsrnsr&ms=ltu&mt=1654343612&mv=D&mvi=5&pl=0&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRgIhALn805Jw740HYSVIwsqbrmv50qLDZexOZO28KdSmjT_QAiEAgO7MA9OhVk8nLi12FjDAj-qiG35Z77DZKjsiQ3JubQo%3D",
    },
    {
      url: "https://rr1---sn-vgqsrnll.googlevideo.com/videoplayback?expire=1654366052&ei=BEubYsPKBoaE2LYPu_2Y6Ag&ip=3.234.221.229&id=o-AB_ka-ATP4_KSdbCVBulYApuSF0loqtIFu41DyrVyW0K&itag=18&source=youtube&requiressl=yes&spc=4ocVC9h1iA4coCxxh8CUMzZnYR4oJP8&vprv=1&mime=video%2Fmp4&ns=jflASdMb64QSnBmaLRUBXbYG&gir=yes&clen=11037324&ratebypass=yes&dur=130.194&lmt=1640916418264647&fexp=24001373,24007246&c=WEB&txp=5438434&n=G2-wgBizq9qLn7STLi&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIgTJMlgQYVmaQ8m8VSVlNiFJcc5ho1tLdlZ-t11jLus0sCIQCAOag6lodYTtVehW5lSozYhVqS0PQcPSgAJLCh4083mw%3D%3D&redirect_counter=1&cm2rm=sn-p5qeed7l&req_id=316ea0cdd472a3ee&cms_redirect=yes&cmsv=e&mh=Sm&mip=118.137.179.189&mm=34&mn=sn-vgqsrnll&ms=ltu&mt=1654343612&mv=D&mvi=1&pl=0&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhAKu9DS1XZ8_K3yzj20qSetkoR3qwWukgSlm-FMfITcj4AiA4K1rWkwrzu4CYdrpju9zkhv3RyCFjDQnrPHRiFAdsCg%3D%3D",
    },
    {
      url: "https://rr3---sn-vgqsknek.googlevideo.com/videoplayback?expire=1654366083&ei=I0ubYv3wCLiLhwa9r4O4DQ&ip=3.234.221.229&id=o-AL6I-8gssANCRtfK-z6JuPF5qzcSsLjAJ1gRXdLPs3kp&itag=18&source=youtube&requiressl=yes&spc=4ocVC_WgA3Itugy5Vv1Mso4ANDt85fs&vprv=1&mime=video%2Fmp4&ns=QbZm8XiGU-EI7WmRHrQaQn4G&gir=yes&clen=8460048&ratebypass=yes&dur=98.731&lmt=1653096123409041&fexp=24001373,24007246&c=WEB&txp=5438434&n=N3j2JRPh11J13DMm86&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAL5LRUAaTNpYXNUKHEmfZ9IF4IYWViT9O_7T0gN90VIEAiEAmF2U8OB7TU5vHaulmNGz1WwrmiW7XzWbGnYymAJ17Es%3D&redirect_counter=1&cm2rm=sn-p5qeez7z&req_id=c205e7917610a3ee&cms_redirect=yes&cmsv=e&mh=dU&mip=118.137.179.189&mm=34&mn=sn-vgqsknek&ms=ltu&mt=1654343612&mv=D&mvi=3&pl=0&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRgIhAJDCxTEtiftc91CwbiRfPONB5J4eNRMM197dMxyhhvPmAiEAvOtnMqMGzCqxDM_aCPcpDbXqWkwC5k5gdAMuTNmcrb8%3D",
    },
    {
      url: "https://rr5---sn-p5qs7nzr.googlevideo.com/videoplayback?expire=1654366110&ei=PkubYtrEBoyA2LYPrtSUwAg&ip=3.234.221.229&id=o-APgDK1EVntF03xG9H6KMu9azyOv3mrzxDp3RFVGBJxsj&itag=18&source=youtube&requiressl=yes&mh=Oo&mm=31%2C26&mn=sn-p5qs7nzr%2Csn-ab5l6nzy&ms=au%2Conr&mv=m&mvi=5&pl=24&initcwndbps=896250&spc=4ocVC4cMHe_ACpi2Dij8-Rd-ws84IyU&vprv=1&mime=video%2Fmp4&ns=u6MNisHzKfgTPbENp6520oMG&gir=yes&clen=27485652&ratebypass=yes&dur=357.401&lmt=1631446214531939&mt=1654344063&fvip=3&fexp=24001373%2C24007246&c=WEB&txp=5319224&n=svtPtRRgT6FdEzAw_6&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRAIgFU80uyEYZL9RHw0DgniUNociO1uxmhlZywl7B7bvLwwCIHu6jx2M6tQN3r_vkpIlv62tpHQ8Ahn3nZQNasUhB4sC&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgBZ9NQze-fTCjgI7Db-xKSqO3qn7d4sZZaLQ6YTVGYFECIQCOaNv3R6B3yi9jV5yG-uB3py03YnwDKdPoWMX_9DTRbg%3D%3D",
    },
  ];

  React.useEffect(() => {
    ScreenOrientation.addOrientationChangeListener((listener) => {
      console.log(listener);
      if (
        listener.orientationInfo.orientation ==
        ScreenOrientation.Orientation.LANDSCAPE_LEFT
      ) {
        setOrientation("landscape");
      } else {
        setOrientation("potrait");
      }
    });
    return () => {
      ScreenOrientation.removeOrientationChangeListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        snapToAlignment={"start"}
        viewabilityConfig={viewConfig.current}
        pagingEnabled={true}
        decelerationRate={"fast"}
        onViewableItemsChanged={itemChange.current}
        renderItem={({ item, index }) => {
          return (
            <VideoPlayer
              current={current}
              index={index}
              orientation={orientation}
              url={item.url}
            />
          );
        }}
      />
      {/* <Button
        title={status.isPlaying ? "Pause" : "Play"}
        onPress={() =>

        }
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
