import { Skeleton, Stack } from "@chakra-ui/react";

export interface SkeletonLoaderProps {
  count: number;
  height: string;
  width?: string;
  spacing?: number;
}

const SkeletonLoader = ({
  count,
  height,
  width,
  spacing,
}: SkeletonLoaderProps) => {
  return (
    <>
      <Stack width="100%" spacing={spacing ? spacing : 1}>
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
