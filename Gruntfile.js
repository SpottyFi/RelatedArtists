module.exports = (grunt) => {
    require('time-grunt')(grunt);
    grunt.loadNpmTasks('grunt-run');
    grunt.initConfig({
      run: {
        createData: {
          cmd: 'npm',
          args: [
            'run',
            'gen-data',
          ],
        },
        pushData: {
          cmd: 'npm',
          args: [
            'run',
            'upload-data',
          ],
        },
        pushLocalData: {
          cmd: 'npm',
          args: [
            'run',
            'upload-local-data',
          ],
        },
      },
    });
    grunt.registerTask('create-data', ['run:createData']);
    grunt.registerTask('push-data', ['run:pushData']);
    grunt.registerTask('push-local-data', ['run:pushLocalData']);
    grunt.registerTask('data-me', () => {
      const MAX = grunt.option('max');
      const PUSH = grunt.option('mode') === 'production' ? 'push-data' : 'push-local-data';
      for (let count = 1; count <= MAX; count += 1) {
        grunt.task.run('create-data', PUSH);
      }
    });
  };