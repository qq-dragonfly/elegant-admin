import compression from 'vite-plugin-compression';

export default function createCompression(env: any) {
  const { VITE_BUILD_COMPRESS } = env;
  const compressList = VITE_BUILD_COMPRESS.split(',');
  const plugin: any[] = [];
  if (compressList.includes('gzip')) {
    plugin.push(
      compression({
        verbose: true,
        disable: false,
        ext: '.gz',
        algorithm: 'gzip', //压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
        threshold: 1024 * 50, // 体积大于 threshold 才会被压缩,单位 b
        deleteOriginFile: false // 压缩后是否删除源文件
      })
    );
  }
  if (compressList.includes('brotli')) {
    plugin.push(
      compression({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile: false
      })
    );
  }
  return plugin;
}
