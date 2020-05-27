//tslint:disable
export const sd = async (root: any, m: any, uniqBy: any) =>
    await Promise.all(
        root.map(async ({ name }: any) => {
            const level1 = m.filter((t: any) => t.name.split('.')[0] === name);
            const withLevel1 = level1.map(({ name }: any) => ({
                key: name.split('.')[1],
                title: name.split('.')[1],
            }));
            const uni = uniqBy(withLevel1, 'title');
            // console.log(uni);
            return {
                // first level
                key: name,
                title: name,
                children: uni.map(({ key, title }: any) => {
                    // second level
                    const level2 = m.filter((t: any) => t.name.split('.')[1] === title);
                    const withLevel2 = level2.map(({ name }: any) => ({
                        key: name.split('.')[2],
                        title: name.split('.')[2],
                    }));
                    const uni2: any = uniqBy(withLevel2, 'title');
                    const temp = uni2 && uni2[0].key ? true : false;

                    return {
                        key,
                        title,
                        isLeaf: temp ? false : true,
                        children: temp
                            ? uni2.map(({ key, title }: any) => {
                                  // third level
                                  const level3 = m.filter(
                                      (t: any) => t.name.split('.')[2] === title
                                  );
                                  const withLevel3 = level3.map(({ name }: any) => ({
                                      key: name.split('.')[3],
                                      title: name.split('.')[3],
                                  }));
                                  const uni3: any = uniqBy(withLevel3, 'title');
                                  const temp = uni3 && uni3[0].key ? true : false;

                                  return {
                                      key,
                                      title,
                                      isLeaf: temp ? false : true,
                                      children: temp
                                          ? uni3.map(({ key, title }: any) => {
                                                const level4 = m.filter(
                                                    (t: any) => t.name.split('.')[3] === title
                                                );
                                                const withLevel4 = level4.map(({ name }: any) => ({
                                                    key: name.split('.')[4] || '',
                                                    title: name.split('.')[4] || '',
                                                }));
                                                const uni4: any = uniqBy(withLevel4, 'title');
                                                const temp = uni4 && uni4[0].key ? true : false;

                                                return {
                                                    // fourth level
                                                    key,
                                                    title,
                                                    isLeaf: temp ? false : true,
                                                    children: temp
                                                        ? uni4.map(({ key, title }: any) => {
                                                              const level5 = m.filter(
                                                                  (t: any) =>
                                                                      t.name.split('.')[4] === title
                                                              );
                                                              const withLevel5 = level5.map(
                                                                  ({ name }: any) => ({
                                                                      key: name.split('.')[5] || '',
                                                                      title:
                                                                          name.split('.')[5] || '',
                                                                  })
                                                              );
                                                              const uni5: any = uniqBy(
                                                                  withLevel5,
                                                                  'title'
                                                              );
                                                              const temp =
                                                                  uni5 && uni5[0].key
                                                                      ? true
                                                                      : false;

                                                              return {
                                                                  key,
                                                                  title,
                                                                  isLeaf: temp ? false : true,
                                                                  children: temp
                                                                      ? uni5.map(
                                                                            ({
                                                                                key,
                                                                                title,
                                                                            }: any) => {
                                                                                const level6 = m.filter(
                                                                                    (t: any) =>
                                                                                        t.name.split(
                                                                                            '.'
                                                                                        )[5] ===
                                                                                        title
                                                                                );
                                                                                const withLevel6 = level6.map(
                                                                                    ({
                                                                                        name,
                                                                                    }: any) => ({
                                                                                        key: name.split(
                                                                                            '.'
                                                                                        )[6],
                                                                                        title:
                                                                                            name.split(
                                                                                                '.'
                                                                                            )[6] ||
                                                                                            '',
                                                                                    })
                                                                                );
                                                                                const uni6: any = uniqBy(
                                                                                    withLevel6,
                                                                                    'title'
                                                                                );
                                                                                const temp =
                                                                                    uni6 &&
                                                                                    uni6[0].key
                                                                                        ? true
                                                                                        : false;

                                                                                return {
                                                                                    key,
                                                                                    title,
                                                                                    isLeaf: temp
                                                                                        ? false
                                                                                        : true,
                                                                                    children: temp
                                                                                        ? uni6.map(
                                                                                              ({
                                                                                                  key,
                                                                                                  title,
                                                                                              }: any) => {
                                                                                                  return {
                                                                                                      key,
                                                                                                      title,

                                                                                                      isLeaf: temp
                                                                                                          ? false
                                                                                                          : true,
                                                                                                      children: null,
                                                                                                  };
                                                                                              }
                                                                                          )
                                                                                        : null,
                                                                                };
                                                                            }
                                                                        )
                                                                      : null,
                                                              };
                                                          })
                                                        : null,
                                                };
                                            })
                                          : null,
                                  };
                              })
                            : null,
                    };
                }),
            };
        })
    );
