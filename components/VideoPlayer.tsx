import { AVPlaybackStatus, Video } from "expo-av";
import React from "react";
import { Dimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

type Props = {
  orientation: "potrait" | "landscape";
  index: number;
  current: number;
  url: string;
};

const VideoPlayer = (props: Props) => {
  const [status, setStatus] = React.useState<any>();
  const video: any = React.useRef(null);

  const orientation = props?.orientation ?? "potrait";

  React.useEffect(() => {
    const index = props.index;
    if (props.current === index) {
      video.current.playAsync();
    } else if (props.current === index + 1 || props.current === index - 1) {
      console.log("stop");
      video.current.stopAsync();
    }
  }, [props.current]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log(status);
        if (status && status.isPlaying) {
          video.current.pauseAsync();
        } else {
          video.current.playAsync();
        }
      }}
    >
      <Video
        ref={video}
        style={
          orientation == "potrait"
            ? { width: width, height: height }
            : { width: height, height: width }
        }
        source={{
          uri: props?.url ?? "",
        }}
        // useNativeControls
        // resizeMode="contain"

        isLooping
        // shouldPlay
        onPlaybackStatusUpdate={(status: any) => setStatus(() => status)}
      />
    </TouchableWithoutFeedback>
  );
};

export default VideoPlayer;
