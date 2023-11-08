import { renderHook } from "@testing-library/react";

import useMIMEType from "./useMIMEType";

describe("useMIMEType hook", () => {
  it('should set mediaCategory and mediaExtension to "other" for non-matching URIs', () => {
    const { result } = renderHook(() =>
      useMIMEType("https://example.com/file.unknown")
    );

    expect(result.current.mediaCategory).toBe("other");
    expect(result.current.mediaExtension).toBe("other");
  });

  it('should recognize image extensions and set mediaCategory to "image"', () => {
    const { result } = renderHook(() =>
      useMIMEType("https://example.com/image.jpg")
    );

    expect(result.current.mediaCategory).toBe("image");
    expect(result.current.mediaExtension).toBe(".jpg");
  });

  it('should recognize video extensions and set mediaCategory to "video"', () => {
    const { result } = renderHook(() =>
      useMIMEType("https://example.com/video.mp4")
    );

    expect(result.current.mediaCategory).toBe("video");
    expect(result.current.mediaExtension).toBe(".mp4");
  });

  it('should recognize audio extensions and set mediaCategory to "audio"', () => {
    const { result } = renderHook(() =>
      useMIMEType("https://example.com/audio.mp3")
    );

    expect(result.current.mediaCategory).toBe("audio");
    expect(result.current.mediaExtension).toBe(".mp3");
  });
  it("should handle empty URI", () => {
    const { result } = renderHook(() => useMIMEType(""));

    expect(result.current.mediaCategory).toBe("other");
    expect(result.current.mediaExtension).toBe("other");
  });

  it("should update state when URI changes", () => {
    const { result, rerender } = renderHook(
      ({ uri }: { uri: string }) => useMIMEType(uri),
      {
        initialProps: { uri: "https://example.com/image.jpg" },
      }
    );

    expect(result.current.mediaCategory).toBe("image");

    rerender({ uri: "https://example.com/video.mp4" });

    expect(result.current.mediaCategory).toBe("video");
  });

  it('should default to "other" for unhandled extensions', () => {
    const { result } = renderHook(() =>
      useMIMEType("https://example.com/file.xyz")
    );

    expect(result.current.mediaCategory).toBe("other");
  });
});
