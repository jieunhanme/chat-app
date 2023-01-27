import { Skeleton, Stack } from "@chakra-ui/react";

export interface SkeletonLoaderProps {
  count: number;
  height: string;
  width?: string;
}

const SkeletonLoader = ({ count, height, width }: SkeletonLoaderProps) => {
  return (
    <>
      <Stack width="100%" p={4}>
        {[...Array(count)].map((_, i) => (
          <Skeleton
            key={i}
            height={height}
            width={width ? width : "100%"}
            borderRadius={4}
            startColor="blackAlpha.400"
            endColor="whiteAlpha.300"
          />
        ))}
      </Stack>
    </>
  );
};

export default SkeletonLoader;
