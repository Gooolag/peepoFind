import React, {
  createRef,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { constants, SIZES, COLORS } from "../constants";
import Home from "../screens/Home/Home.Screen";
import Profile from "../screens/Profile/Profile.Screen";
import Search from "../screens/Search/Search.Screen";

import { bottomTabIndexType } from "../utils/types";

interface Props {}

const Tabs = ({ onBottomTabPress }: any) => {
  // #TODO: fix types
  return (
    <View style={styles.tabsContainer}>
      {constants?.bottom_tabs.map((item, index: any) => {
        return (
          <TouchableOpacity
            key={`tabs-${index}`}
            style={styles.tabsWrapper}
            onPress={() => onBottomTabPress(index)}
          >
            <Image
              resizeMode="contain"
              source={item.icon}
              style={styles.tabIcons}
            />
            <Text style={styles.iconLabel}> {item.label} </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const MainLayout: FC<Props> = (props) => {
  const flatListRef = useRef<any>();
  const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;
  const onBottomTabPress = useCallback<any>(
    (bottomTabIndex: bottomTabIndexType) => {
      flatListRef?.current?.scrollToOffset({
        offset: bottomTabIndex * SIZES.width,
      });
    },
    []
  );
  const RenderContent = () => {
    return (
      <View style={styles.contentContainer}>
        <Animated.FlatList
          ref={flatListRef}
          horizontal
          scrollEnabled={false}
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          data={constants.bottom_tabs}
          keyExtractor={(item) => `Main-${item.id}`}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.itemStyles}>
                {item?.label == constants.screens.home && <Home />}
                {item?.label == constants.screens.search && <Search />}
                {item?.label == constants.screens.profile && <Profile />}
              </View>
            );
          }}
        />
      </View>
    );
  };

  const RenderBottomTabs = () => {
    return (
      <View style={styles.bottomTabs}>
        <Shadow size={[SIZES.width - SIZES.padding * 2, 85]}>
          <View style={styles.bottomContainer}>
            <Tabs onBottomTabPress={onBottomTabPress} />
          </View>
        </Shadow>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* CONTENT */}
      {RenderContent()}

      {/* BOTTOM NAVIGATOR */}
      {RenderBottomTabs()}
    </View>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flex: 1,
  },
  itemStyles: {
    height: SIZES.height,
    width: SIZES.width,
  },
  bottomTabs: {
    marginBottom: 20,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.radius,
  },
  bottomContainer: {
    flex: 1,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary2,
  },
  tabsContainer: {
    flex: 1,
    flexDirection: "row",
  },
  tabsWrapper: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcons: {
    width: 25,
    height: 25,
  },
  iconLabel: {
    marginTop: 3,
    color: COLORS.white,
  },
  tabIndicatorContainer: {
    position: "absolute",
    left: 0,
    height: "100%",
    width: 80,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
  },
});
