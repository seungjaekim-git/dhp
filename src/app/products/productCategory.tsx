const categoryData = [
    {
      id: 'led-driver',
      name: 'LED Driver IC',
      count: 324,
      manufacturers: ['Macroblock', 'Powtech', 'XLSEMI'],
      subcategories: [
        {
          name: 'DC-DC LED 드라이버',
          items: [
            '벅 컨버터 타입',
            '부스트 컨버터 타입',
            '벅-부스트 컨버터 타입',
            '정전류 제어형',
            '디밍 제어형'
          ]
        },
        {
          name: 'AC-DC LED 드라이버',
          items: [
            '단상 입력형',
            '삼상 입력형', 
            '역률 보정형',
            '절연형',
            '비절연형'
          ]
        },
        {
          name: 'LED 매트릭스 드라이버',
          items: [
            '정전류 매트릭스',
            'PWM 제어형',
            'RGB LED 컨트롤러',
            '디스플레이용 드라이버',
            '사이니지용 드라이버'
          ]
        }
      ],
    },
      {
        id: 'diode',
        name: '다이오드',
        count: 567,
        manufacturers: ['Zowie'],
        subcategories: [
          {
            name: '정류 다이오드',
            items: [
              '일반용 정류 다이오드',
              '고속 정류 다이오드',
              '브리지 정류기',
              '고전압용 정류기',
              '저전압용 정류기'
            ]
          },
          {
            name: '쇼트키 다이오드',
            items: [
              '저전압용 쇼트키',
              '고전압용 쇼트키',
              '듀얼 쇼트키',
              'SiC 쇼트키',
              '전력용 쇼트키'
            ]
          },
          {
            name: '제너 다이오드',
            items: [
              '저전압 제너',
              '고전압 제너',
              '정밀 제너',
              '가변 제너',
              '양방향 제너'
            ]
          },
          {
            name: 'TVS 다이오드',
            items: [
              '단방향 TVS',
              '양방향 TVS',
              '배열형 TVS',
              'ESD 보호용',
              '서지 보호용'
            ]
          }
        ]
      },
      {
        id: 'cable',
        name: '케이블',
        count: 289,
        manufacturers: ['LLT', 'Morethanall'],
        subcategories: [
          {
            name: '전원 케이블',
            items: [
              'AC 전원 케이블',
              'DC 전원 케이블',
              '고압 전력선',
              '차폐 전원 케이블',
              '태양광 케이블'
            ]
          },
          {
            name: '데이터 케이블',
            items: [
              'USB 케이블',
              'HDMI 케이블',
              'LAN 케이블',
              '동축 케이블',
              '시리얼 케이블'
            ]
          },
          {
            name: '광 케이블',
            items: [
              '싱글모드 광케이블',
              '멀티모드 광케이블',
              '리본형 광케이블',
              '방수형 광케이블',
              '군용 광케이블'
            ]
          },
          {
            name: '산업용 케이블',
            items: [
              '로봇용 케이블',
              '모터 케이블',
              '센서 케이블',
              '제어용 케이블',
              '내열/내한 케이블'
            ]
          }
        ]
      },
      {
        id: 'connector',
        name: '커넥터',
        count: 432,
        manufacturers: ['LLT', 'Morethanall'],
        subcategories: [
          {
            name: '원형 커넥터',
            items: [
              'M8 커넥터',
              'M12 커넥터',
              '군용 원형 커넥터',
              '방수 원형 커넥터',
              '푸시풀 커넥터'
            ]
          },
          {
            name: '보드 대 보드',
            items: [
              'BTB 커넥터',
              'FPC/FFC 커넥터',
              '메자닌 커넥터',
              '고속전송용 커넥터',
              '전원용 커넥터'
            ]
          },
          {
            name: 'RF 커넥터',
            items: [
              'SMA 커넥터',
              'BNC 커넥터',
              'N-Type 커넥터',
              'MCX/MMCX 커넥터',
              '동축 커넥터'
            ]
          },
          {
            name: '전원 커넥터',
            items: [
              'DC 전원 커넥터',
              'AC 전원 커넥터',
              'ATX 전원 커넥터',
              '배터리 커넥터',
              '산업용 전원 커넥터'
            ]
          }
        ]
      },
      {
        id: 'sensor',
        name: '센서',
        count: 678,
        manufacturers: ['Kube Electronics AG'],
        subcategories: [
          {
            name: '온도 센서',
            items: [
              '써미스터',
              'RTD 센서',
              '열전대',
              'IC 타입 온도센서',
              '적외선 온도센서'
            ]
          },
          {
            name: '압력 센서',
            items: [
              '피에조 저항형',
              '정전용량형',
              '광학식 압력센서',
              'MEMS 압력센서',
              '차압 센서'
            ]
          },
          {
            name: '가속도 센서',
            items: [
              '1축 가속도센서',
              '2축 가속도센서',
              '3축 가속도센서',
              'MEMS 가속도센서',
              '진동 센서'
            ]
          },
          {
            name: '근접 센서',
            items: [
              '정전용량형',
              '유도형',
              '광학식',
              '초음파식',
              '자기식'
            ]
          }
        ]
      },
      {
        id: 'passive',
        name: '수동소자',
        count: 892,
        subcategories: [
          {
            name: '저항기',
            items: [
              '칩 저항',
              '금속피막 저항',
              '와이어와운드 저항',
              'SMD 저항',
              '고정밀 저항'
            ]
          },
          {
            name: '커패시터',
            items: [
              '세라믹 커패시터',
              '전해 커패시터',
              '탄탈 커패시터',
              '필름 커패시터',
              'MLCC'
            ]
          },
          {
            name: '인덕터',
            items: [
              '칩 인덕터',
              '파워 인덕터',
              'SMD 인덕터',
              '페라이트 비드',
              'RF 인덕터'
            ]
          },
          {
            name: '변압기',
            items: [
              '전원용 변압기',
              '고주파 변압기',
              '펄스 변압기',
              '절연 변압기',
              'SMD 변압기'
            ]
          }
        ]
      },
      {
        id: 'power-ic',
        name: '전원관리 IC',
        count: 445,
        manufacturers: ['Macroblock', 'Powtech', 'XLSEMI'],
        subcategories: [
          {
            name: 'DC-DC 컨버터',
            items: [
              '벅 컨버터',
              '부스트 컨버터',
              '벅-부스트 컨버터',
              'POL 컨버터',
              '절연형 컨버터'
            ]
          },
          {
            name: '배터리 관리 IC',
            items: [
              '충전 컨트롤러',
              'BMS IC',
              '보호 IC',
              '연료게이지 IC',
              '밸런싱 IC'
            ]
          },
          {
            name: '전압 레귤레이터',
            items: [
              'LDO 레귤레이터',
              'PWM 컨트롤러',
              'PFC 컨트롤러',
              '선형 레귤레이터',
              '고전압 레귤레이터'
            ]
          },
          {
            name: '전원 모니터링 IC',
            items: [
              '전압 감시 IC',
              '전류 모니터 IC',
              '전력 미터링 IC',
              '시퀀서 IC',
              '서지 보호 IC'
            ]
          }
        ]
      }
  ];

export default categoryData;